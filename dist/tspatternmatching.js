var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TsPatternMatching;
(function (TsPatternMatching) {
    'use strict';
    var MatchError = (function (_super) {
        __extends(MatchError, _super);
        function MatchError() {
            _super.apply(this, arguments);
        }
        return MatchError;
    })(Error);
    TsPatternMatching.MatchError = MatchError;
    var Subject = (function () {
        function Subject(subject) {
            this.subject = subject;
        }
        Subject.prototype.caseOf = function (_case, _matched) {
            return new Match(this.subject, _case, _matched, this);
        };
        Subject.prototype.resolve = function () {
            throw new MatchError("No match for: " + JSON.stringify(this.subject));
        };
        return Subject;
    })();
    TsPatternMatching.Subject = Subject;
    var Default = (function () {
        function Default(_subject, _matched, _parent) {
            this._subject = _subject;
            this._matched = _matched;
            this._parent = _parent;
        }
        Default.prototype.resolve = function () {
            try {
                return this._parent.resolve();
            }
            catch (err) {
                if (err instanceof MatchError) {
                    return this._matched(this._subject);
                }
                throw err;
            }
        };
        return Default;
    })();
    TsPatternMatching.Default = Default;
    var Match = (function () {
        function Match(_subject, _case, _matched, _parent) {
            this._subject = _subject;
            this._case = _case;
            this._matched = _matched;
            this._parent = _parent;
        }
        Match.prototype.caseOf = function (_case, _matched) {
            return new Match(this._subject, _case, _matched, this);
        };
        Match.prototype._ = function (_matched) {
            return new Default(this._subject, _matched, this);
        };
        Match.prototype.resolve = function () {
            try {
                return this._parent.resolve();
            }
            catch (err) {
                if (err instanceof MatchError) {
                    if (this._case(this._subject)) {
                        return this._matched(this._subject);
                    }
                    else {
                        throw new MatchError("No match for: " + JSON.stringify(this._subject));
                    }
                }
                throw err;
            }
        };
        return Match;
    })();
    TsPatternMatching.Match = Match;
    function match(subject) {
        return new Subject(subject);
    }
    TsPatternMatching.match = match;
})(TsPatternMatching || (TsPatternMatching = {}));
(function () {
    'use strict';
    if (typeof module !== 'undefined' && module.exports) {
        // it's node
        module.exports = TsPatternMatching;
    }
    else {
        // stick it on the global object
        this.TsPatternMatching = TsPatternMatching;
    }
}).call(this);
//# sourceMappingURL=tspatternmatching.js.map