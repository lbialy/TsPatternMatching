module TsPatternMatching {

    'use strict';

    export interface Case<X> {
        (x:X):boolean;
    }

    export interface Matched<X,Y> {
        (x:X):Y;
    }

    export interface Resolvable<X,Y> {
        resolve():Y;
    }

    export interface Caseable<X,Y> extends Resolvable<X,Y> {
        caseOf(_case:Case<X>, _matched:Matched<X,Y>):Matchable<X,Y>
    }

    export interface Matchable<X,Y> extends Caseable<X,Y> {
        _(_matched:Matched<X,Y>):Default<X,Y>
    }

    export class MatchError extends Error {
    }

    export class Subject<X,Y> implements Caseable<X,Y> {

        public constructor(protected subject:X) {
        }

        public caseOf(_case:Case<X>, _matched:Matched<X,Y>):Match<X,Y> {
            return new Match<X,Y>(this.subject, _case, _matched, this);
        }

        public resolve():Y {
            throw new MatchError("No match for: " + JSON.stringify(this.subject));
        }
    }

    export class Default<X,Y> implements Resolvable<X,Y> {

        constructor(protected _subject:X, protected _matched:Matched<X,Y>, protected _parent:Resolvable<X,Y>) {
        }

        public resolve():Y {
            try {
                return this._parent.resolve();
            } catch (err) {
                if (err instanceof MatchError) {
                    return this._matched(this._subject)
                }

                throw err;
            }
        }
    }

    export class Match<X,Y> implements Matchable<X,Y> {

        constructor(protected _subject:X, protected _case:Case<X>, protected _matched:Matched<X,Y>, protected _parent:Resolvable<X,Y>) {
        }

        caseOf(_case:Case<X>, _matched:Matched<X,Y>):Matchable<X,Y> {
            return new Match<X,Y>(this._subject, _case, _matched, this);
        }

        _(_matched:Matched<X,Y>):Default<X,Y> {
            return new Default<X,Y>(this._subject, _matched, this)
        }

        public resolve():Y {
            try {
                return this._parent.resolve();
            } catch (err) {
                if (err instanceof MatchError) {
                    if (this._case(this._subject)) {
                        return this._matched(this._subject);
                    } else {
                        throw new MatchError("No match for: " + JSON.stringify(this._subject));
                    }
                }

                throw err;
            }
        }
    }

    export function match<X,Y>(subject:X):Subject<X,Y> {
        return new Subject<X,Y>(subject);
    }
}

// Node module declaration taken from node.d.ts
declare var module:{
    exports: any;
    require(id:string): any;
    id: string;
    filename: string;
    loaded: boolean;
    parent: any;
    children: any[];
};

/**
 * @name tspatternmatching
 * @namespace Hold classes and functions related to TsPatternMatching library.
 */
declare module 'tspatternmatching' {
    export = TsPatternMatching;
}

(function () {
    'use strict';

    if (typeof module !== 'undefined' && module.exports) {
        // it's node
        module.exports = TsPatternMatching;
    } else {
        // stick it on the global object
        this.TsPatternMatching = TsPatternMatching;
    }
}).call(this);