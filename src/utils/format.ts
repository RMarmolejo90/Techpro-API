// functions for formatting the database data

function formatString(str: string) {
    console.log(str)
    if (typeof str !== 'string') {throw new Error(`incorrect format: type is ${typeof str}`)}
    // Helper function to capitalize each word
    const capitalizeWords = (str: string) => str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());

    // Mapping for common street abbreviations
    const abbreviations = new Map<string, string>([
      ['Street', 'St'],
      ['Drive', 'Dr'],
      ['Avenue', 'Ave'],
      ['Road', 'Rd'],
      ['Lane', 'Ln'],
      ['Boulevard', 'Blvd'],
      ['Highway', 'Hwy'],
      ['Parkway', 'Pkwy'],
      ['Suite', 'Ste'],
      ['Apartment', 'Apt'],
      ['Building', 'Bldg'],
      ['Court', 'Ct'],
      ['Room', 'Rm'],
      ['Place', 'Pl'],
      ['Circle', 'Cir'],
      ['Square', 'Sq'],
      ['Department', 'Dept'],
      ['Floor', 'Fl'],
      ['Terrace', 'Terr']
    ]);

    // Split the address into words
    let words = str.split(/\s+/);

    // Capitalize each word and apply abbreviations
    words = words.map(word => {
      // Check for highway pattern and insert dash if necessary
      if (word.match(/^(US|IN)\d+$/)) {
        return word.replace(/(\D+)(\d+)/, '$1-$2');
      }

      const capitalizedWord = capitalizeWords(word);
      return abbreviations.get(capitalizedWord) || capitalizedWord;
    });
  return words.join(' ');
}


export {
  formatString,
}