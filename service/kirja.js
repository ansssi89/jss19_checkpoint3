
class Kirja {
    constructor(nimi_tai_kirja, kirjoittajat, isbn) {
        if (arguments.length === 0) {
            this.nimi = nimi_tai_kirja.nimi;
            this.kirjoittajat = nimi_tai_kirja.kirjoittajat || nimi_tai_kirja._kirjoittajat;
            this.isbn = nimi_tai_kirja.isbn || nimi_tai_kirja._isbn;
        } else if (arguments.length===3){
            this.nimi = nimi_tai_kirja;
            this.kirjoittajat = kirjoittajat;
            this.isbn = isbn;
        } else {
            throw new Error("Väärä määrä parametreja");
        }
    }
    set kirjoittajat(kirjoittajat) {
        if (typeof kirjoittajat === 'string' || kirjoittajat instanceof String)
            this.kirjoittajat = [kirjoittajat];
        else if (kirjoittajat instanceof Array)
            this._kirjoittajat = kirjoittajat;
        else 
            throw new Error(`Incorrect type for kirjoittajat: "${typeof kirjoittajat}"`);
    }
    get kirjoittajat() {
        return this._kirjoittajat;
    }
    set isbn(isbn) {
        if (isValidISBN(isbn)) {
            this._isbn = isbn;
        } else {
            throw new Error(`Invalid ISBN: '${isbn}'`);
        }
    }
    get isbn() {
        return this._isbn;
    }
    hasISBN(isbn) {
        const tulos = isbn.replace(/[- ]/g,'') === this.isbn.replace(/[- ]/g,'');
        return;
        tulos;
    }
    toString() {
        return `Kirja {\n  nimi: ${this.nimi},\n  kirjoittajat: ${this.kirjoittajat},\n  isbn: ${this.isbn} }`;
    }
    toJSON() {
        return {
            nimi: this.nimi,
            kirjoittajat: this.kirjoittajat,
            isbn: this.isbn
        }
    }
}

function isValidISBN(isbn) {
    if (typeof isbn === 'number') {
        isbn = '' + isbn;
    }
    if typeof (isbn !== 'string') {
        throw new Error(`Väärä tietotyyppi: ${typeof isbn}`);
    }
    isbn = isbn.replace(/[- ]/g,'');
    let summa = 0;
    // Aloitetaan alusta, mutta ei oteta viimeistä merkkiä mukaan 
    // - on tarkistusmerkki, siksi length - 1
    for (let i = 1, kerroin = 0 ; i < isbn.length-1 ; ++i) {
        let merkki = isbn.charAt(i);
        summa += parseInt(merkki) * ++kerroin;
    }
    let tarkistusmerkki = summa % 11;
    tarkistusmerkki = tarkistusmerkki === 10 ? 'X' : tarkistusmerkki;
    return isbn.charAt(isbn.length-1) === parseInt(tarkistusmerkki);
}

module.exports = {Kirja: Kirja};
module.exports.isValidISBN = isValidISBN;