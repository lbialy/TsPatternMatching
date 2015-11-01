/// <reference path="../dist/tspatternmatching.d.ts" />
/// <reference path="../typings/tsd.d.ts" />

import match = TsPatternMatching.match;
import MatchError = TsPatternMatching.MatchError;

describe('Pattern matching', () => {

    class Whisky {
        constructor(public brand:string, public years:number, public origin:string, public price:number) {
        }
    }

    const walker = {brand: 'Johnny Walker', years: 5, origin: 'USA', price: 12};
    const dalwhinnie = new Whisky('Dalwhinnie', 15, 'Highlands', 32);

    it('should match on primitives', () => {

        //const years = 23;
        //var result = match<number, string>(years)
        //    .caseOf(age => age > 25, () => 'Epic!')
        //    .caseOf(age => age > 15 && age <= 25, () => 'Great')
        //    .caseOf(age => age > 9 && age <= 15, () => 'Neat')
        //    .caseOf(age => age <= 9, () => 'Meh...')
        //    .resolve();
        //
        //result.should.be.equal('Great');

        // whisky yo :P
        const years = 23;
        var result = match<number, string>(years)
            .caseOf(age => age > 25, () => 'Epic!')
            .caseOf(age => age > 15 && age <= 25, () => 'Great')
            .caseOf(age => age > 9 && age <= 15, () => 'Neat')
            .caseOf(age => age <= 9, () => 'Meh...')
            .resolve();

        result.should.be.equal('Great');
    });

    it('should allow matching on destructured objects', () => {

        //const matchWhisky = (whisky:Whisky) => match<Whisky, string>(whisky)
        //    .caseOf(({brand, price}) => price < 30, ({brand,years,origin,price}) => `${brand} ${years} is quite cheap`)
        //    .caseOf(({brand, price}) => price > 30, ({brand,years,origin,price}) => `${brand} ${years} is not very pricey`)
        //    .resolve();
        //
        //matchWhisky(walker).should.be.equal('Johnny Walker 5 is quite cheap');

        const matchWhisky = (whisky:Whisky) => match<Whisky, string>(whisky)
            .caseOf(({brand, price}) => price < 30, ({brand,years,origin,price}) => `${brand} ${years} is quite cheap`)
            .caseOf(({brand, price}) => price > 30, ({brand,years,origin,price}) => `${brand} ${years} is not very pricey`)
            .resolve();

        matchWhisky(walker).should.be.equal('Johnny Walker 5 is quite cheap');

    });

    it('should throw match error when not matched', () => {

        //const matchWhisky = (whisky:Whisky) => match<Whisky, number>(whisky)
        //    .caseOf(({years}) => years === 10, ({price}) => price)
        //    .caseOf(({years}) => years === 15, ({price}) => price)
        //    .resolve();
        //
        //(() => {
        //    matchWhisky(walker);
        //}).should.throw(MatchError);

        const matchWhisky = (whisky:Whisky) => match<Whisky, number>(whisky)
            .caseOf(({years}) => years === 10, ({price}) => price)
            .caseOf(({years}) => years === 15, ({price}) => price)
            .resolve();

        (() => {
            matchWhisky(walker);
        }).should.throw(MatchError);

    });

    it('should return default value when not matched and default was provided', () => {

        //const matchWhisky = (whisky:Whisky) => match<Whisky, number>(whisky)
        //    .caseOf(({years}) => years === 10, ({price}) => price)
        //    ._ ( _ => 23 )
        //    .resolve();
        //
        //matchWhisky(dalwhinnie).should.be.equal(23);

        const matchWhisky = (whisky:Whisky) => match<Whisky, number>(whisky)
            .caseOf(({years}) => years === 10, ({price}) => price)
            ._ (_ => 23)
            .resolve();

        matchWhisky(dalwhinnie).should.be.equal(23);

    });

});