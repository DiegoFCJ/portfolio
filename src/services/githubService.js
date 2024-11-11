// githubService.js
const GITHUB_README_URL = 'https://api.github.com/repos/DiegoFCJ/DiegoFCJ/readme';
const GITHUB_TOKEN = process.env.REACT_APP_API_KEY_GITHUB;

// Funzione per ottenere il contenuto del README
export const getReadme = async () => {
  try {
    const response = await fetch(GITHUB_README_URL, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3.raw',
      },
    });

    if (!response.ok) {
      throw new Error('Errore nel recupero del README');
    }

    const readme = await response.text();
    return { readme };
  } catch (error) {
    console.error('Errore nel recupero del README:', error);
    throw error;
  }
};

export const extractSection = (content, section) => {
  const sectionRegex = new RegExp(`### ${section}[\\s\\S]*?(?=###|$)`, 'g');
  const sectionMatch = content.match(sectionRegex);

  if (sectionMatch) {
    // Rimuovi il carattere di escape `\` prima di `)` nel regex `badgeRegex`
    const badgeRegex = /!\[([^\]]+)\]\([^)+]\)/g; // Modifica: Rimosso l'escape inutile `\)`

    const matches = sectionMatch[0].match(badgeRegex);

    return matches
      ? matches.map(match => {
          const skillNameMatch = match.match(/!\[([^\]]+)\]/);
          return skillNameMatch ? skillNameMatch[1] : '';
        }).filter(skill => skill)
      : [];
  }
  return [];
};