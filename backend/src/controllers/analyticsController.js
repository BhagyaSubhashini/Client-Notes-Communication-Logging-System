import { pool } from "../config/db.js";

// GET ALL ANALYTICS
export const getAnalytics = async (req, res) => {
  try {
    
    // KPI CARDS

    const totalClients = await pool.query(`
      SELECT COUNT(*)::int AS count
      FROM clients
    `);

    const totalUsers = await pool.query(`
      SELECT COUNT(*)::int AS count
      FROM users
    `);

    const totalNotes = await pool.query(`
      SELECT COUNT(*)::int AS count
      FROM notes
    `);

    const totalReplies = await pool.query(`
      SELECT COUNT(*)::int AS count
      FROM replies
    `);

    const unansweredNotes = await pool.query(`
      SELECT COUNT(*)::int AS count
      FROM notes n
      LEFT JOIN replies r
      ON n.note_id = r.note_id
      WHERE r.reply_id IS NULL
    `);

    // NOTES PER USER

    const notesPerUser = await pool.query(`
      SELECT
        u.username,
        COUNT(n.note_id)::int AS count
      FROM users u
      LEFT JOIN notes n
      ON u.user_id = n.user_id
      GROUP BY u.username
      ORDER BY count DESC
    `);

    // NOTES PER CLIENT

    const notesPerClient = await pool.query(`
      SELECT
        c.full_name,
        COUNT(n.note_id)::int AS count
      FROM clients c
      LEFT JOIN notes n
      ON c.client_id = n.client_id
      GROUP BY c.full_name
      ORDER BY count DESC
      LIMIT 10
    `);

    // NOTE TYPES

    const noteTypes = await pool.query(`
      SELECT
        note_type,
        COUNT(*)::int AS count
      FROM notes
      GROUP BY note_type
    `);

// CURRENT WEEK NOTES

const weeklyTrend = await pool.query(`
WITH days AS (
  SELECT generate_series(
    date_trunc('week', CURRENT_DATE),
    date_trunc('week', CURRENT_DATE) + interval '6 day',
    interval '1 day'
  ) AS day
)

SELECT
  TO_CHAR(d.day, 'Dy') AS day_name,
  COUNT(n.note_id)::int AS count

FROM days d

LEFT JOIN notes n
ON DATE(n.created_at) = DATE(d.day)

GROUP BY d.day

ORDER BY d.day
`);

    // REPLIES PER USER

    const repliesPerUser = await pool.query(`
      SELECT
        u.username,
        COUNT(r.reply_id)::int AS count
      FROM users u
      LEFT JOIN replies r
      ON u.user_id = r.user_id
      GROUP BY u.username
      ORDER BY count DESC
    `);

// RESPONSE TIMES BY REPLY USER

const responseTimes = await pool.query(`
  SELECT
    u.username,

    ROUND(
      AVG(
        EXTRACT(
          EPOCH FROM
          (r.created_at - n.created_at)
        ) / 60
      )
    )::int AS avg_minutes

  FROM replies r

  JOIN notes n
  ON r.note_id = n.note_id

  JOIN users u
  ON r.user_id = u.user_id

  GROUP BY u.username

  HAVING COUNT(r.reply_id) > 0

  ORDER BY avg_minutes ASC
`);

    // OVERALL AVG RESPONSE

    const overallResponse = await pool.query(`
      WITH first_replies AS (
        SELECT
          note_id,
          MIN(created_at) AS first_reply_time
        FROM replies
        GROUP BY note_id
      )

      SELECT

      ROUND(
        AVG(
          EXTRACT(
            EPOCH FROM
            (fr.first_reply_time - n.created_at)
          ) / 60
        )
      )::int AS avg_minutes

      FROM notes n

      JOIN first_replies fr
      ON n.note_id = fr.note_id
    `);

    // UNANSWERED NOTES TABLE

    const unansweredList = await pool.query(`
  SELECT
    n.note_id,
    n.created_at,
    n.note_type,
    n.note_content,

    u.username,

    c.client_id,
    c.full_name,
    c.email

  FROM notes n

  JOIN users u
  ON n.user_id = u.user_id

  JOIN clients c
  ON n.client_id = c.client_id

  LEFT JOIN replies r
  ON n.note_id = r.note_id

  WHERE r.reply_id IS NULL

  ORDER BY n.created_at DESC
`);

    res.json({
      stats: {
        clients: totalClients.rows[0].count,
        users: totalUsers.rows[0].count,
        notes: totalNotes.rows[0].count,
        replies: totalReplies.rows[0].count,
        unanswered: unansweredNotes.rows[0].count,
        avgResponse:
          overallResponse.rows[0]?.avg_minutes || 0,
      },

      notesPerUser:
        notesPerUser.rows,

      notesPerClient:
        notesPerClient.rows,

      noteTypes:
        noteTypes.rows,

      weeklyTrend:
        weeklyTrend.rows,

      repliesPerUser:
        repliesPerUser.rows,

      responseTimes:
        responseTimes.rows,

      unansweredNotes:
        unansweredList.rows,
    });

  } catch (err) {

    console.error(
      "Analytics error:",
      err
    );

    res.status(500).json({
      message:
        "Failed to load analytics",
    });

  }
};