// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};
// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

function pAequorFactory(num, dnaSequence) {
  return {
    specimenNum: num, // assigns specimen number and dna sequence
    dna: dnaSequence,
    mutate() { // makes mutate method to randomly mutate a nucleotide
      randIndex = Math.floor(Math.random() * this.dnaSequence.length)
      originalValue = this.dnaSequence[randIndex] // stores original value of chosen nucleotide
      while(this.dnaSequence[randIndex] === originalValue) {
        this.dnaSequence[randIndex] = returnRandBase() // randomly chooses another base while nucleotide is still equal to its origial value
      }
    },
    compareDNA(pAequor2) { 
      let numSameDNA = 0 //sets initial same dna to 0
      for (let i = 0; i < pAequor2.length; i++) {
        if (pAequor2[i] === this.dna[i]) { // iterates through every nucleotide and adds to numSameDNA if the nucleotides match
          numSameDNA ++;
        }
      }
      console.log(`pAeqour 1 and pAequor 2 have ${numSameDNA / pAequor2.length}% similarity`) // prints similarity
    },
    willLikelySurvive() { //creates method to calculate likeliness to survive
      let numSame = 0;
      for (let i = 0; i < this.dna.length; i ++) { //iterates through every nucleotide and checks if it is equal to C or G
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          numSame ++ // adds to num same if it is
        }
      }
      if (numSame / this.dna.length >= 0.60) {
        return true  // returns true if percentage of G and C is more than 60%
      } else {
        return false
      }
    }
  }
}

let survivors = [] // sets array of survivors to an empty array
while (survivors.length < 30) { // runs until survivors length is equal to 30
  sample = pAequorFactory(Math.floor(Math.random() * 1000), mockUpStrand()) // creates a sample of pAequor to test 
  if (sample.willLikelySurvive()) { // pushes dna of pAequor if the will likely to survive value is true
    survivors.push(sample.dna)
  }
}
//console.log(survivors) // prints value of survivors
console.log(survivors)