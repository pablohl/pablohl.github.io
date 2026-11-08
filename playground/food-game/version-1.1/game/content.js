// Editorial food bank. Tags are this game's simplified answers for the specified preparation.
// Change examples and wording here without touching mechanics or layout.
(function(root) {
  const rows = [
    ['apple','🍎','Apple slices',true,0,'Fresh apple slices have fiber and no added sugar.'],
    ['banana','🍌','Banana',true,0,'A plain banana is a fruit with fiber.'],
    ['carrot','🥕','Carrot sticks',true,0,'Plain carrots are a vegetable snack.'],
    ['broccoli','🥦','Steamed broccoli',true,0,'Steamed vegetables are our healthy choice.'],
    ['candy','🍬','Bag of candy',false,0,'A bag of candy has lots of added sugar.'],
    ['icecream','🍨','Large ice cream sundae',false,0,'A large sundae with syrup is a sugary treat.'],
    ['lollipop','🍭','Lollipop',false,0,'A lollipop is mostly sugar.'],
    ['sandwich','🥪','Vegetable sandwich',true,1,'Whole-grain bread and vegetables make this a balanced choice.'],
    ['chicken','🍗','Grilled chicken',true,1,'This chicken is grilled, not deep-fried, and served in a moderate portion.'],
    ['berries','🍓','Plain strawberries',true,1,'These strawberries have no added syrup or sugar.'],
    ['soda','🥤','Large sugary soda',false,1,'This drink has lots of added sugar.'],
    ['donut','🍩','Frosted doughnut',false,1,'The frosting and dough make this a sugary treat.'],
    ['oats','🥣','Oats with fruit',true,2,'These oats have whole grains, fruit, and no added sugar.'],
    ['yogurt','🥣','Plain yogurt with berries',true,2,'Plain yogurt and berries give variety without added sugar.'],
    ['rice','🍚','Brown rice with vegetables',true,2,'Whole-grain rice and vegetables make a balanced side.'],
    ['sweet-yogurt','🥣','Yogurt with candy and syrup',false,2,'The candy and syrup add lots of sugar to this version.'],
    ['fries','🍟','Extra-large salty fries',false,2,'This oversized portion has lots of salt and added fat.'],
    ['banana-choc','🍌','Banana with a thin chocolate drizzle',true,3,'For this game, a whole banana with a small drizzle is the balanced choice.'],
    ['bar','🍫','Giant chocolate bar',false,3,'This very large portion contains lots of added sugar.'],
    ['nuts','🥜','Small handful of unsalted nuts',true,3,'A modest portion of plain nuts has fiber and useful nutrients.'],
    ['fruit-syrup','🍑','Fruit in heavy syrup',false,3,'For this game, heavy added syrup makes this the sugary option.'],
    ['toast','🍞','Whole-grain toast with avocado',true,4,'Whole grains and avocado provide fiber; fat alone does not make a food unhealthy.'],
    ['juice','🧃','Oversized sweetened fruit drink',false,4,'The fruit label does not remove the added sugar or large portion.'],
    ['salad','🥗','Vegetables with a little olive oil',true,4,'Vegetables and a small amount of olive oil are a balanced combination.'],
  ];
  root.GameContent = {
    title: "Eric’s Restaurant",
    foods: rows.map(([id,emoji,name,healthy,level,explanation])=>({id,emoji,name,healthy,level,explanation})),
    level(category,mode) { return Math.min(4, {baby:0,child:1,adult:2}[category]+{easy:0,medium:1,hard:2}[mode]); },
  };
})(globalThis);
