export default async function handler(req, res) {
  const token = process.env.FOOTBALL_DATA_TOKEN;

  if (!token) {
    return res.status(500).json({
      error: "Football API token is not configured."
    });
  }

  try {
    const competition = req.query.competition || "PL";

    const allowedCompetitions = [
      "PL", "PD", "BL1", "SA", "FL1", "CL"
    ];

    if (!allowedCompetitions.includes(competition)) {
      return res.status(400).json({
        error: "Unsupported competition."
      });
    }

    const response = await fetch(
      `https://api.football-data.org/v4/competitions/${competition}/matches`,
      {
        headers: {
          "X-Auth-Token": token
        }
      }
    );

    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({
      error: "Unable to retrieve football data."
    });
  }
}
