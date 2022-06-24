function createMedalTable(medals) {
    // Parse the medal data to produce a medaltable
    // The winner gets 3 points, second place 2 points and third place 1 point

      // Initialize constants
  const medalTable = {};
  const scale = [3, 2, 1];

  // Loop through all sports, and for each sport loop through its children
  const medalsLength = medals.length;
  for (let i = 0; i < medalsLength; i += 1) {
    const children = medals[i].podium;

    const childrenLength = children.length;

    for (let j = 0; j < childrenLength; j += 1) {
      const child = children[j];

      /* 
        Check if the child matches the pattern "positiveInteger.anyCharacter"
        or skip to the next child
        Playground: https://regex101.com/r/hGnipr/1
      */
      const matched = child.match(/^\d+[.](.*)/);

      if (!matched) continue;

      /*
        Exctract the rank and country.
        Fetch the points from the scale given the ranking
        Update or initialize the points of the current country in the dictionary table
      */
      let [rank, country] = child.split(".");
      rank = parseInt(rank, 10);
      const points = scale[rank - 1];
      const oldPoints = medalTable[country];
      const newPoints = oldPoints ? oldPoints + points : points;

      medalTable[country] = newPoints;
    }
  }

    return medalTable;
}

describe("Medal Table Generator", () => {
    // Test function, please do not edit
    it("creates correct data structure ", () => {
        // Input data
        const medals = [{
                sport: "cycling",
                podium: ["1.China", "2.Germany", "3.ROC"]
            },
            {
                sport: "fencing",
                podium: ["1.ROC", "2.France", "3.Italy"]
            },
            {
                sport: "high jump",
                podium: ["1.Italy", "1.Qatar", "3.Belarus"]
            },
            {
                sport: "swimming",
                podium: ["1.USA", "2.France", "3.Brazil"]
            }
        ];

        // Expected output data
        const medalTable = {
            "Italy": 4,
            "France": 4,
            "ROC": 4,
            "USA": 3,
            "Qatar": 3,
            "China": 3,
            "Germany": 2,
            "Brazil": 1,
            "Belarus": 1,
        };

        const actualResult = createMedalTable(medals);
        expect(actualResult).toMatchObject(medalTable);
    });
});