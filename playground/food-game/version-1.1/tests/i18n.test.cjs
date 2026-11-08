const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
require('../game/content.js');
const context={window:{},document:{documentElement:{},title:''},localStorage:{getItem:()=> 'es',setItem(){}}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../game/i18n.js'),'utf8'),context);
const I=context.window.GameI18n;
assert.equal(I.language,'es');
for(const language of ['en','es','fr']) {
 I.setLanguage(language);
 assert.equal(context.document.documentElement.lang,language);
 for(const food of GameContent.foods)for(const key of [food.name,food.explanation]) {
  assert(I.strings[key]?.es,`Missing Spanish: ${key}`);
  assert(I.strings[key]?.fr,`Missing French: ${key}`);
  assert(I.t(key));
 }
 const status=I.t('Player {id}’s turn ({control})',{id:2,control:I.t('CPU')});
 assert(status.includes('2')&&!status.includes('{'));
}
I.setLanguage('invalid');assert.equal(I.language,'en');
I.setLanguage('fr');assert.equal(I.t('Eat'),'Manger');
I.setLanguage('es');assert.equal(I.t('Eat'),'Comer');
I.setLanguage('en');assert.equal(I.t('Eat'),'Eat');
const blocked={window:{},document:{documentElement:{},title:''},localStorage:{getItem(){throw Error('Unavailable');},setItem(){throw Error('Unavailable');}}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../game/i18n.js'),'utf8'),blocked);
blocked.window.GameI18n.setLanguage('fr');assert.equal(blocked.window.GameI18n.language,'fr');
console.log('Passed: all food translations, language switching, placeholders, saved preference, invalid preference, and unavailable storage.');
