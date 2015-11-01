## TsPatternMatching

Typesafe pattern matching emulation for TypeScript and JavaScript.

###### Syntax example:

```javascript
class Whisky {
	constructor(public brand:string, public age:number, public origin:string, public price:number) {}
}

const dalwhinnie = new Whisky('Dalwhinnie', 15, 'Highlands', 32);

var result = match<Whisky, string>(dalwhinnie)
		.caseOf(w => w.age > 24 && w.age <= 40, () => 'Epic!')
        .caseOf(w => w.age > 14 && w.age <= 24, () => 'Great')
        .caseOf(({brand,age}) => age > 9 && age <= 14, () => 'Neat') // Destructuring
        .caseOf(w => w.age <= 9, () => 'Meh...')
        ._( _ => 'Legendary!')                                       // Wildcard
        .resolve();

result.should.be.equal('Great');
```

If no wildcard value is provided and no match is provided MatchError is thrown. More examples are available in mocha.js testsuite (see below).

###### Testing

You need node.js. Clone repository and then:
```bash
$ cd TsPatternMatching && npm install && gulp
```
Navigate to 'test/bin' and open index.html to see mocha tests.



##### Author => Łukasz Biały => [lukasz@keios.eu](mailto:lukasz@keios.eu)

##### License => [MIT](LICENSE)