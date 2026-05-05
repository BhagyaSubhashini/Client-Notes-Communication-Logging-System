const ClientCard = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow w-80">
      <h3 className="text-lg font-semibold mb-2">Alexander Sterling</h3>
      <p className="text-sm text-gray-500 mb-4">WHMCS ID: sterl_2024</p>

      <div className="text-sm space-y-2">
        <p>📞 +44 7700 900077</p>
        <p>📧 a.sterling@vanguard.co</p>
        <p>🌐 vanguard-digital.com</p>
      </div>

      <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg">
        + Add Note
      </button>
    </div>
  );
};

export default ClientCard;