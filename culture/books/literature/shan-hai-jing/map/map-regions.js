// One continuous illustrated world, not measured ancient coordinates.
// Text-backed names and local directions are retained; connecting terrain is imaginative.
// Region navigation moves the camera and never swaps maps or filters creatures.
// Geographic regions are independent of source chapters: Yinglong settles in the south.

export const worldMap = {
  "image": "./assets/map-world.webp",
  "preview": "./assets/map-world-preview.webp",
  "width": 3072,
  "height": 2304,
  "maxBytes": 1536000
};

export const regions = [
  {"id":"western","nameZh":"西山","nameEn":"West","bounds":{"x":1,"y":23,"width":44,"height":47}},
  {"id":"northern","nameZh":"北山","nameEn":"North","bounds":{"x":7,"y":8,"width":70,"height":30}},
  {"id":"central","nameZh":"中山","nameEn":"Center","bounds":{"x":38,"y":21,"width":31,"height":43}},
  {"id":"eastern","nameZh":"东山","nameEn":"East","bounds":{"x":64,"y":36,"width":21,"height":30}},
  {"id":"southern","nameZh":"南山","nameEn":"South","bounds":{"x":8,"y":48,"width":71,"height":47}},
  {"id":"eastern-sea","nameZh":"东海","nameEn":"Eastern Sea","bounds":{"x":79,"y":29,"width":21,"height":57}}
];

export const places = [
  {"id":"niuyang","regionId":"southern","nameZh":"杻阳山","pinyin":"niǔ yáng shān","nameEn":"Niuyang Mountain","x":33,"y":70},
  {"id":"qingqiu","regionId":"southern","nameZh":"青丘山","pinyin":"qīng qiū shān","nameEn":"Qingqiu Mountain","x":53.8,"y":69},
  {"id":"changyou-mountain","regionId":"southern","nameZh":"长右山","pinyin":"cháng yòu shān","nameEn":"Changyou Mountain","x":17,"y":88},
  {"id":"luwu-mountain","regionId":"southern","nameZh":"鹿吴山","pinyin":"lù wú shān","nameEn":"Luwu Mountain","x":29,"y":90},
  {"id":"danxue","regionId":"southern","nameZh":"丹穴山","pinyin":"dān xué shān","nameEn":"Danxue Mountain","x":65,"y":73},
  {"id":"chongwu","regionId":"western","nameZh":"崇吾山","pinyin":"chóng wú shān","nameEn":"Chongwu Mountain","x":40,"y":63},
  {"id":"taiqi","regionId":"western","nameZh":"泰器山","pinyin":"tài qì shān","nameEn":"Taiqi Mountain","x":36,"y":47},
  {"id":"yu","regionId":"western","nameZh":"玉山","pinyin":"yù shān","nameEn":"Yu Mountain","x":32,"y":40.3},
  {"id":"zhange","regionId":"western","nameZh":"章莪山","pinyin":"zhāng é shān","nameEn":"Zhang'e Mountain","x":26.8,"y":49.5},
  {"id":"yin","regionId":"western","nameZh":"阴山","pinyin":"yīn shān","nameEn":"Yin Mountain","x":21,"y":49},
  {"id":"sanwei","regionId":"western","nameZh":"三危山","pinyin":"sān wēi shān","nameEn":"Sanwei Mountain","x":16,"y":48},
  {"id":"tianshan","regionId":"western","nameZh":"天山","pinyin":"tiān shān","nameEn":"Tian Mountain","x":11,"y":43},
  {"id":"yiwang","regionId":"western","nameZh":"翼望山","pinyin":"yì wàng shān","nameEn":"Yiwang Mountain","x":6,"y":47},
  {"id":"xiaoci","regionId":"western","nameZh":"小次山","pinyin":"xiǎo cì shān","nameEn":"Xiaoci Mountain","x":13.3,"y":62.4},
  {"id":"shizhe","regionId":"northern","nameZh":"石者山","pinyin":"shí zhě shān","nameEn":"Shizhe Mountain","x":47.2,"y":13.4},
  {"id":"danxun","regionId":"northern","nameZh":"丹熏山","pinyin":"dān xūn shān","nameEn":"Danxun Mountain","x":33.2,"y":34.5},
  {"id":"macheng","regionId":"northern","nameZh":"马成山","pinyin":"mǎ chéng shān","nameEn":"Macheng Mountain","x":55,"y":21},
  {"id":"fajiu","regionId":"northern","nameZh":"发鸠山","pinyin":"fā jiū shān","nameEn":"Fajiu Mountain","x":63,"y":28},
  {"id":"huo","regionId":"central","nameZh":"霍山","pinyin":"huò shān","nameEn":"Huo Mountain","x":45,"y":45},
  {"id":"aoan","regionId":"central","nameZh":"敖岸山","pinyin":"áo àn shān","nameEn":"Ao'an Mountain","x":61.5,"y":52.5},
  {"id":"qin","regionId":"eastern","nameZh":"钦山","pinyin":"qīn shān","nameEn":"Qin Mountain","x":75.5,"y":57.5},
  {"id":"yinglong-south","regionId":"southern","nameZh":"应龙住在南方","pinyin":"nán fāng","nameEn":"Yinglong's southern home","x":73,"y":90},
  {"id":"liubo","regionId":"eastern-sea","nameZh":"流波山","pinyin":"liú bō shān","nameEn":"Liubo Island","x":94,"y":61.5},
  {"id":"north-of-tao","regionId":"northern","nameZh":"蜪犬之北","pinyin":"táo quǎn zhī běi","nameEn":"North of the Tao Dogs","x":29,"y":16},
  {"id":"linshi","regionId":"northern","nameZh":"林氏国","pinyin":"lín shì guó","nameEn":"The land of Linshi","x":23,"y":26},
  {"id":"quanfeng","regionId":"northern","nameZh":"犬封国","pinyin":"quǎn fēng guó","nameEn":"Quanfeng Country","x":13,"y":23}
];

export const annotations = [
  {"overview":true,"kind":"region","textZh":"西山","textEn":"Western Mountains","x":21,"y":35},
  {"overview":true,"kind":"region","textZh":"北山","textEn":"Northern Mountains","x":53,"y":11},
  {"overview":true,"kind":"region","textZh":"中山","textEn":"Central Mountains","x":51,"y":43},
  {"overview":true,"kind":"region","textZh":"东山","textEn":"Eastern Mountains","x":75,"y":39},
  {"overview":true,"kind":"region","textZh":"南山","textEn":"Southern Mountains","x":45,"y":68},
  {"overview":true,"kind":"sea","textZh":"东海","textEn":"Eastern Sea","x":89,"y":46},
  {"kind":"sea","textZh":"北海","textEn":"Northern Sea","x":68,"y":5},
  {"kind":"wilderness","textZh":"大荒北方","textEn":"Northern Wilderness","x":89,"y":7},
  {"kind":"wilderness","textZh":"大荒东方","textEn":"Eastern Wilderness","x":95,"y":29},
  {"kind":"water","textZh":"怪水向东 →","textEn":"Guai River · east →","x":42,"y":82},
  {"kind":"water","textZh":"英水 ↓ 即翼泽","textEn":"Ying River · south ↓","x":55,"y":85},
  {"kind":"water","textZh":"观水向西 ←","textEn":"Guan River · west ←","x":33,"y":51},
  {"kind":"water","textZh":"浊浴水 ↓ 蕃泽","textEn":"Zhuoyu River · south ↓","x":21,"y":59},
  {"kind":"water","textZh":"英水向西南 ↙","textEn":"Ying River · southwest ↙","x":7,"y":54},
  {"kind":"water","textZh":"漳水向东 →","textEn":"Zhang River · east →","x":70,"y":35},
  {"kind":"water","textZh":"师水向北 ↑","textEn":"Shi River · north ↑","x":76,"y":48}
];

export const placements = {
  "lushu": {"regionId":"southern","placeId":"niuyang","position":{"x":33,"y":66.8,"width":3.8},"clueZh":"杻阳山上好像有人在唱歌。哪只动物像马，却有老虎一样的条纹？","clueEn":"A song comes from Niuyang Mountain. Which horse-like creature has tiger stripes?"},
  "xuangui": {"regionId":"southern","placeId":"niuyang","position":{"x":47.8,"y":83,"width":4},"clueZh":"顺着杻阳山流出的怪水找。谁有乌龟的身体、鸟的头？","clueEn":"Follow the Guai River out of Niuyang Mountain. Who has a turtle's body and a bird's head?"},
  "nine-tailed-fox": {"regionId":"southern","placeId":"qingqiu","position":{"x":51.3,"y":68.6,"width":3.8},"clueZh":"去东边的青丘山看看。哪只安静的狐狸身后藏着九条尾巴？","clueEn":"Look east toward Qingqiu Mountain. Which quiet fox has nine tails?"},
  "changyou": {"regionId":"southern","placeId":"changyou-mountain","position":{"x":16,"y":74,"width":4.2},"clueZh":"没有草木的长右山上，水声四处响。哪只猴子模样的动物有四只耳朵？","clueEn":"Water trickles over the bare rocks of Changyou Mountain. Which monkey-like creature has four ears?"},
  "gudiao": {"regionId":"southern","placeId":"luwu-mountain","position":{"x":33.4,"y":88.25,"width":4.2},"clueZh":"到鹿吴山脚的泽更水边看看。哪只鸟模样的奇兽头上长着角？","clueEn":"Look in the water below Luwu Mountain. Which bird-like creature has a horn?"},
  "fenghuang": {"regionId":"southern","placeId":"danxue","position":{"x":63,"y":66,"width":4.4},"clueZh":"丹穴山上有一只五彩的鸟。谁的羽毛像把好多颜色放在了一起？","clueEn":"A bird waits on Danxue Mountain. Whose feathers hold so many colors?"},
  "biyiniao": {"regionId":"western","placeId":"chongwu","position":{"x":40,"y":60,"width":4.5},"clueZh":"从崇吾山开始找。哪两只鸟各有一只翅膀，要并排才能飞？","clueEn":"Start at Chongwu Mountain. Which two birds need each other's wing to fly?"},
  "wenyaoyu": {"regionId":"western","placeId":"taiqi","position":{"x":20.2,"y":50.3,"width":4},"clueZh":"泰器山的观水向西流。看看河湾的水面，哪条鱼长着翅膀？","clueEn":"The Guan River flows west from Taiqi Mountain. Look just above the river bend. Which fish has wings?"},
  "jiao": {"regionId":"western","placeId":"yu","position":{"x":29.5,"y":27.2,"width":4},"clueZh":"玉山上传来小狗的叫声。谁有豹纹和牛一样的角？","clueEn":"A dog-like bark comes from Yu Mountain. Who has spots and ox-like horns?"},
  "zheng": {"regionId":"western","placeId":"zhange","position":{"x":27.8,"y":42.5,"width":3.8},"clueZh":"章莪山上没有草木。岩石旁，谁有五条尾巴和一只角？","clueEn":"No plants grow on Zhang'e Mountain. Which creature among the rocks has five tails and one horn?"},
  "bifang": {"regionId":"western","placeId":"zhange","position":{"x":25,"y":39.5,"width":3.8},"clueZh":"狰也住的这座章莪山上，还有一只青色大鸟。它有几只脚？","clueEn":"Look higher on the same mountain as Zheng. How many legs does that blue-green bird have?"},
  "tiangou": {"regionId":"western","placeId":"yin","position":{"x":16.2,"y":53.8,"width":3.8},"clueZh":"往章莪山西边找，阴山上有一颗白脑袋。谁叫天狗，却像狸？","clueEn":"Look west of Zhang'e Mountain for a white head on Yin Mountain. Which Heavenly Dog looks like a wildcat?"},
  "sanqingniao": {"regionId":"western","placeId":"sanwei","position":{"x":16.8,"y":65.4,"width":4.6},"clueZh":"三危山上有三个红脑袋。数数看，三只青鸟是不是都在？","clueEn":"Find the red heads on Sanwei Mountain. Can you count all three blue-green birds?"},
  "dijiang": {"regionId":"western","placeId":"tianshan","position":{"x":10.5,"y":24.3,"width":4},"clueZh":"天山上有个圆滚滚的身影。它没有脸，却有六只脚和四只翅膀。","clueEn":"A round shape waits on Tian Mountain. It has no face, but six feet and four wings."},
  "qitu": {"regionId":"western","placeId":"yiwang","position":{"x":6,"y":43,"width":4},"clueZh":"翼望山没有树，岩石上却传来笑声。谁有三颗头和六条尾巴？","clueEn":"There are no trees on Yiwang Mountain, but laughter comes from the rocks. Who has three heads and six tails?"},
  "zhuyan": {"regionId":"western","placeId":"xiaoci","position":{"x":13.3,"y":59.3,"width":4.2},"clueZh":"西边的小次山上，白色脑袋下面，谁长着红色的脚？","clueEn":"Explore Xiaoci Mountain in the west. Who has a white head and red feet?"},
  "mengji": {"regionId":"northern","placeId":"shizhe","position":{"x":47.2,"y":9.4,"width":4},"clueZh":"丹熏山北边是石者山。岩石之间，哪只白色小兽最会躲藏？","clueEn":"Shizhe Mountain lies north of Danxun Mountain. Which white creature hides among the rocks?"},
  "ershu": {"regionId":"northern","placeId":"danxun","position":{"x":33.4,"y":31.7,"width":4.2},"clueZh":"看看丹熏山的林边。谁有兔子一样的头，正用尾巴贴着山坡飞？","clueEn":"Look along the forest edge on Danxun Mountain. Who has a rabbit-like head and flies low over the slope with its tail?"},
  "tianma": {"regionId":"northern","placeId":"macheng","position":{"x":42.5,"y":19.2,"width":4.4},"clueZh":"看看马成山林间的地面。谁有白身体、黑脑袋，正贴着地面跃起？","clueEn":"Look in the woodland clearing on Macheng Mountain. Who has a white body and a black head, just taking off?"},
  "jingwei": {"regionId":"eastern-sea","placeId":"fajiu","position":{"x":91,"y":34,"width":5.5},"clueZh":"到东海的海面上找找。哪只小鸟嘴里衔着树枝，要把大海填平？","clueEn":"Look out over the Eastern Sea. Which little bird is carrying a twig to fill the sea?"},
  "feifei": {"regionId":"central","placeId":"huo","position":{"x":45,"y":41.6,"width":3.6},"clueZh":"地图中间，霍山的树旁露出一条白尾巴。哪只小兽像狸？","clueEn":"Near the middle of the map, a white tail peeks out beside the trees on Huo Mountain. Who looks like a wildcat?"},
  "fuzhu": {"regionId":"central","placeId":"aoan","position":{"x":59.2,"y":51.6,"width":3.6},"clueZh":"看看敖岸山的岩石和树影之间。哪只白鹿模样的奇兽长着四只角？","clueEn":"Look between the rocks and trees on Ao'an Mountain. Which white deer-like creature has four horns?"},
  "dangkang": {"regionId":"eastern","placeId":"qin","position":{"x":75.5,"y":53.5,"width":4.4},"clueZh":"钦山的师水向北流。河边的陆地上，谁像一只长着大牙的猪？","clueEn":"The Shi River flows north from Qin Mountain. Which pig-like creature stands on dry ground nearby?"},
  "yinglong": {"regionId":"southern","placeId":"yinglong-south","position":{"x":73,"y":85,"width":5},"clueZh":"往南边有雨的山谷找。哪条龙有一对展开的翅膀？","clueEn":"Explore the rainy valley in the south. Which dragon has a pair of open wings?"},
  "kui": {"regionId":"eastern-sea","placeId":"liubo","position":{"x":91,"y":66,"width":4.5},"clueZh":"东海里有座流波山。岛边水中，谁像牛，却只有一只脚？","clueEn":"Find Liubo Mountain out in the Eastern Sea. Which ox-like creature beside the island has just one leg?"},
  "qiongqi": {"regionId":"northern","placeId":"north-of-tao","position":{"x":29,"y":13,"width":4.6},"clueZh":"在地图北边找找。哪只老虎模样的奇兽长着翅膀？","clueEn":"Look in the northern part of the map. Can you spot a tiger-like creature with wings?"},
  "zouwu": {"regionId":"northern","placeId":"linshi","position":{"x":23,"y":20.5,"width":5},"clueZh":"地图北边的林氏国藏着一条五彩长尾巴。谁的尾巴比身体还长？","clueEn":"Follow a colorful tail in the land of Linshi, in the northern part of the map. Whose tail is longer than its body?"},
  "jiliang": {"regionId":"northern","placeId":"quanfeng","position":{"x":13,"y":20,"width":4.5},"clueZh":"地图北边的犬封国里，谁披着红鬃毛，有白身体和金色眼睛？","clueEn":"In Quanfeng Country in the northern part of the map, who has a white body, a red mane, and golden eyes?"}
};

// Test source relationships independently from broad illustrative region framing.
export const geographyRelations = [
  {"type":"same-place","creatures":["lushu","xuangui"],"placeId":"niuyang"},
  {"type":"same-place","creatures":["zheng","bifang"],"placeId":"zhange"},
  {"type":"east-of","place":"qingqiu","reference":"niuyang"},
  {"type":"east-of","place":"luwu-mountain","reference":"changyou-mountain"},
  {"type":"west-of","place":"yin","reference":"zhange"},
  {"type":"west-of","place":"sanwei","reference":"yin"},
  {"type":"west-of","place":"tianshan","reference":"sanwei"},
  {"type":"west-of","place":"yiwang","reference":"tianshan"},
  {"type":"north-of","place":"shizhe","reference":"danxun"}
];
