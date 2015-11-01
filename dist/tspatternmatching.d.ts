declare module TsPatternMatching {
    interface Case<X> {
        (x: X): boolean;
    }
    interface Matched<X, Y> {
        (x: X): Y;
    }
    interface Resolvable<X, Y> {
        resolve(): Y;
    }
    interface Caseable<X, Y> extends Resolvable<X, Y> {
        caseOf(_case: Case<X>, _matched: Matched<X, Y>): Matchable<X, Y>;
    }
    interface Matchable<X, Y> extends Caseable<X, Y> {
        _(_matched: Matched<X, Y>): Default<X, Y>;
    }
    class MatchError extends Error {
    }
    class Subject<X, Y> implements Caseable<X, Y> {
        protected subject: X;
        constructor(subject: X);
        caseOf(_case: Case<X>, _matched: Matched<X, Y>): Match<X, Y>;
        resolve(): Y;
    }
    class Default<X, Y> implements Resolvable<X, Y> {
        protected _subject: X;
        protected _matched: Matched<X, Y>;
        protected _parent: Resolvable<X, Y>;
        constructor(_subject: X, _matched: Matched<X, Y>, _parent: Resolvable<X, Y>);
        resolve(): Y;
    }
    class Match<X, Y> implements Matchable<X, Y> {
        protected _subject: X;
        protected _case: Case<X>;
        protected _matched: Matched<X, Y>;
        protected _parent: Resolvable<X, Y>;
        constructor(_subject: X, _case: Case<X>, _matched: Matched<X, Y>, _parent: Resolvable<X, Y>);
        caseOf(_case: Case<X>, _matched: Matched<X, Y>): Matchable<X, Y>;
        _(_matched: Matched<X, Y>): Default<X, Y>;
        resolve(): Y;
    }
    function match<X, Y>(subject: X): Subject<X, Y>;
}
declare var module: {
    exports: any;
    require(id: string): any;
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
