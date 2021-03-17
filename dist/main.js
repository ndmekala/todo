(()=>{"use strict";var t=function(t,e,n,a,r){return{task:t,notes:e,dueDate:n,checklist:a,project:r}},e=function(t){let e;e=localStorage.taskArray?JSON.parse(localStorage.taskArray):[],e.push(t),localStorage.taskArray=JSON.stringify(e)},n=function(t){let e=JSON.parse(localStorage.taskArray),n=e.findIndex((e=>e.task===t.task&&e.notes===t.notes&&e.dueDate===t.dueDate&&e.checklist===t.checklist&&e.project===t.project));e.splice(n,1),localStorage.taskArray=JSON.stringify(e)},a=function(t,e,n,a,r,o){let i=JSON.parse(localStorage.taskArray),s=i.findIndex((e=>{return e.task===t.task&&e.notes===t.notes&&e.dueDate===t.dueDate&&(n=e.checklist,a=t.checklist,Array.isArray(n)&&Array.isArray(a)&&n.length===a.length&&n.every(((t,e)=>t===a[e])))&&e.project===t.project;var n,a}));i[s].task=e,i[s].notes=n,i[s].dueDate=a,i[s].checklist=r,i[s].project=o,localStorage.taskArray=JSON.stringify(i)};function r(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function o(t){r(1,arguments);var e=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===e?new Date(t.getTime()):"number"==typeof t||"[object Number]"===e?new Date(t):("string"!=typeof t&&"[object String]"!==e||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function i(t){r(1,arguments);var e=o(t);return e.setHours(0,0,0,0),e}function s(t,e){r(2,arguments);var n=i(t),a=i(e);return n.getTime()===a.getTime()}function u(t){if(null===t||!0===t||!1===t)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function c(t,e){r(2,arguments);var n=o(t),a=u(e);return isNaN(a)?new Date(NaN):a?(n.setDate(n.getDate()+a),n):n}function d(t){r(1,arguments);var e=o(t);return!isNaN(e)}var l={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function h(t){return function(e){var n=e||{},a=n.width?String(n.width):t.defaultWidth;return t.formats[a]||t.formats[t.defaultWidth]}}var f,m={date:h({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:h({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:h({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},g={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function p(t){return function(e,n){var a,r=n||{};if("formatting"===(r.context?String(r.context):"standalone")&&t.formattingValues){var o=t.defaultFormattingWidth||t.defaultWidth,i=r.width?String(r.width):o;a=t.formattingValues[i]||t.formattingValues[o]}else{var s=t.defaultWidth,u=r.width?String(r.width):t.defaultWidth;a=t.values[u]||t.values[s]}return a[t.argumentCallback?t.argumentCallback(e):e]}}function w(t){return function(e,n){var a=String(e),r=n||{},o=r.width,i=o&&t.matchPatterns[o]||t.matchPatterns[t.defaultMatchWidth],s=a.match(i);if(!s)return null;var u,c=s[0],d=o&&t.parsePatterns[o]||t.parsePatterns[t.defaultParseWidth];return u="[object Array]"===Object.prototype.toString.call(d)?function(t,e){for(var n=0;n<t.length;n++)if(t[n].test(c))return n}(d):function(t,e){for(var n in t)if(t.hasOwnProperty(n)&&t[n].test(c))return n}(d),u=t.valueCallback?t.valueCallback(u):u,{value:u=r.valueCallback?r.valueCallback(u):u,rest:a.slice(c.length)}}}const y={code:"en-US",formatDistance:function(t,e,n){var a;return n=n||{},a="string"==typeof l[t]?l[t]:1===e?l[t].one:l[t].other.replace("{{count}}",e),n.addSuffix?n.comparison>0?"in "+a:a+" ago":a},formatLong:m,formatRelative:function(t,e,n,a){return g[t]},localize:{ordinalNumber:function(t,e){var n=Number(t),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:p({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:p({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(t){return Number(t)-1}}),month:p({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:p({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:p({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(f={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(t){return parseInt(t,10)}},function(t,e){var n=String(t),a=e||{},r=n.match(f.matchPattern);if(!r)return null;var o=r[0],i=n.match(f.parsePattern);if(!i)return null;var s=f.valueCallback?f.valueCallback(i[0]):i[0];return{value:s=a.valueCallback?a.valueCallback(s):s,rest:n.slice(o.length)}}),era:w({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:w({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(t){return t+1}}),month:w({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:w({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:w({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function v(t,e){r(2,arguments);var n=o(t).getTime(),a=u(e);return new Date(n+a)}function b(t,e){r(2,arguments);var n=u(e);return v(t,-n)}function k(t,e){for(var n=t<0?"-":"",a=Math.abs(t).toString();a.length<e;)a="0"+a;return n+a}const C=function(t,e){var n=t.getUTCFullYear(),a=n>0?n:1-n;return k("yy"===e?a%100:a,e.length)},T=function(t,e){var n=t.getUTCMonth();return"M"===e?String(n+1):k(n+1,2)},D=function(t,e){return k(t.getUTCDate(),e.length)},S=function(t,e){return k(t.getUTCHours()%12||12,e.length)},M=function(t,e){return k(t.getUTCHours(),e.length)},x=function(t,e){return k(t.getUTCMinutes(),e.length)},E=function(t,e){return k(t.getUTCSeconds(),e.length)},N=function(t,e){var n=e.length,a=t.getUTCMilliseconds();return k(Math.floor(a*Math.pow(10,n-3)),e.length)};var P=864e5;function L(t){r(1,arguments);var e=1,n=o(t),a=n.getUTCDay(),i=(a<e?7:0)+a-e;return n.setUTCDate(n.getUTCDate()-i),n.setUTCHours(0,0,0,0),n}function O(t){r(1,arguments);var e=o(t),n=e.getUTCFullYear(),a=new Date(0);a.setUTCFullYear(n+1,0,4),a.setUTCHours(0,0,0,0);var i=L(a),s=new Date(0);s.setUTCFullYear(n,0,4),s.setUTCHours(0,0,0,0);var u=L(s);return e.getTime()>=i.getTime()?n+1:e.getTime()>=u.getTime()?n:n-1}function q(t){r(1,arguments);var e=O(t),n=new Date(0);n.setUTCFullYear(e,0,4),n.setUTCHours(0,0,0,0);var a=L(n);return a}var U=6048e5;function A(t,e){r(1,arguments);var n=e||{},a=n.locale,i=a&&a.options&&a.options.weekStartsOn,s=null==i?0:u(i),c=null==n.weekStartsOn?s:u(n.weekStartsOn);if(!(c>=0&&c<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var d=o(t),l=d.getUTCDay(),h=(l<c?7:0)+l-c;return d.setUTCDate(d.getUTCDate()-h),d.setUTCHours(0,0,0,0),d}function W(t,e){r(1,arguments);var n=o(t,e),a=n.getUTCFullYear(),i=e||{},s=i.locale,c=s&&s.options&&s.options.firstWeekContainsDate,d=null==c?1:u(c),l=null==i.firstWeekContainsDate?d:u(i.firstWeekContainsDate);if(!(l>=1&&l<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var h=new Date(0);h.setUTCFullYear(a+1,0,l),h.setUTCHours(0,0,0,0);var f=A(h,e),m=new Date(0);m.setUTCFullYear(a,0,l),m.setUTCHours(0,0,0,0);var g=A(m,e);return n.getTime()>=f.getTime()?a+1:n.getTime()>=g.getTime()?a:a-1}function j(t,e){r(1,arguments);var n=e||{},a=n.locale,o=a&&a.options&&a.options.firstWeekContainsDate,i=null==o?1:u(o),s=null==n.firstWeekContainsDate?i:u(n.firstWeekContainsDate),c=W(t,e),d=new Date(0);d.setUTCFullYear(c,0,s),d.setUTCHours(0,0,0,0);var l=A(d,e);return l}var Y=6048e5;function B(t,e){var n=t>0?"-":"+",a=Math.abs(t),r=Math.floor(a/60),o=a%60;if(0===o)return n+String(r);var i=e||"";return n+String(r)+i+k(o,2)}function z(t,e){return t%60==0?(t>0?"-":"+")+k(Math.abs(t)/60,2):H(t,e)}function H(t,e){var n=e||"",a=t>0?"-":"+",r=Math.abs(t);return a+k(Math.floor(r/60),2)+n+k(r%60,2)}const F={G:function(t,e,n){var a=t.getUTCFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(a,{width:"abbreviated"});case"GGGGG":return n.era(a,{width:"narrow"});case"GGGG":default:return n.era(a,{width:"wide"})}},y:function(t,e,n){if("yo"===e){var a=t.getUTCFullYear(),r=a>0?a:1-a;return n.ordinalNumber(r,{unit:"year"})}return C(t,e)},Y:function(t,e,n,a){var r=W(t,a),o=r>0?r:1-r;return"YY"===e?k(o%100,2):"Yo"===e?n.ordinalNumber(o,{unit:"year"}):k(o,e.length)},R:function(t,e){return k(O(t),e.length)},u:function(t,e){return k(t.getUTCFullYear(),e.length)},Q:function(t,e,n){var a=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"Q":return String(a);case"QQ":return k(a,2);case"Qo":return n.ordinalNumber(a,{unit:"quarter"});case"QQQ":return n.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(a,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(a,{width:"wide",context:"formatting"})}},q:function(t,e,n){var a=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"q":return String(a);case"qq":return k(a,2);case"qo":return n.ordinalNumber(a,{unit:"quarter"});case"qqq":return n.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(a,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(a,{width:"wide",context:"standalone"})}},M:function(t,e,n){var a=t.getUTCMonth();switch(e){case"M":case"MM":return T(t,e);case"Mo":return n.ordinalNumber(a+1,{unit:"month"});case"MMM":return n.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(a,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(a,{width:"wide",context:"formatting"})}},L:function(t,e,n){var a=t.getUTCMonth();switch(e){case"L":return String(a+1);case"LL":return k(a+1,2);case"Lo":return n.ordinalNumber(a+1,{unit:"month"});case"LLL":return n.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(a,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(a,{width:"wide",context:"standalone"})}},w:function(t,e,n,a){var i=function(t,e){r(1,arguments);var n=o(t),a=A(n,e).getTime()-j(n,e).getTime();return Math.round(a/Y)+1}(t,a);return"wo"===e?n.ordinalNumber(i,{unit:"week"}):k(i,e.length)},I:function(t,e,n){var a=function(t){r(1,arguments);var e=o(t),n=L(e).getTime()-q(e).getTime();return Math.round(n/U)+1}(t);return"Io"===e?n.ordinalNumber(a,{unit:"week"}):k(a,e.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getUTCDate(),{unit:"date"}):D(t,e)},D:function(t,e,n){var a=function(t){r(1,arguments);var e=o(t),n=e.getTime();e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0);var a=e.getTime(),i=n-a;return Math.floor(i/P)+1}(t);return"Do"===e?n.ordinalNumber(a,{unit:"dayOfYear"}):k(a,e.length)},E:function(t,e,n){var a=t.getUTCDay();switch(e){case"E":case"EE":case"EEE":return n.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(a,{width:"short",context:"formatting"});case"EEEE":default:return n.day(a,{width:"wide",context:"formatting"})}},e:function(t,e,n,a){var r=t.getUTCDay(),o=(r-a.weekStartsOn+8)%7||7;switch(e){case"e":return String(o);case"ee":return k(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(r,{width:"short",context:"formatting"});case"eeee":default:return n.day(r,{width:"wide",context:"formatting"})}},c:function(t,e,n,a){var r=t.getUTCDay(),o=(r-a.weekStartsOn+8)%7||7;switch(e){case"c":return String(o);case"cc":return k(o,e.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(r,{width:"narrow",context:"standalone"});case"cccccc":return n.day(r,{width:"short",context:"standalone"});case"cccc":default:return n.day(r,{width:"wide",context:"standalone"})}},i:function(t,e,n){var a=t.getUTCDay(),r=0===a?7:a;switch(e){case"i":return String(r);case"ii":return k(r,e.length);case"io":return n.ordinalNumber(r,{unit:"day"});case"iii":return n.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(a,{width:"short",context:"formatting"});case"iiii":default:return n.day(a,{width:"wide",context:"formatting"})}},a:function(t,e,n){var a=t.getUTCHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(t,e,n){var a,r=t.getUTCHours();switch(a=12===r?"noon":0===r?"midnight":r/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},B:function(t,e,n){var a,r=t.getUTCHours();switch(a=r>=17?"evening":r>=12?"afternoon":r>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){var a=t.getUTCHours()%12;return 0===a&&(a=12),n.ordinalNumber(a,{unit:"hour"})}return S(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getUTCHours(),{unit:"hour"}):M(t,e)},K:function(t,e,n){var a=t.getUTCHours()%12;return"Ko"===e?n.ordinalNumber(a,{unit:"hour"}):k(a,e.length)},k:function(t,e,n){var a=t.getUTCHours();return 0===a&&(a=24),"ko"===e?n.ordinalNumber(a,{unit:"hour"}):k(a,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getUTCMinutes(),{unit:"minute"}):x(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getUTCSeconds(),{unit:"second"}):E(t,e)},S:function(t,e){return N(t,e)},X:function(t,e,n,a){var r=(a._originalDate||t).getTimezoneOffset();if(0===r)return"Z";switch(e){case"X":return z(r);case"XXXX":case"XX":return H(r);case"XXXXX":case"XXX":default:return H(r,":")}},x:function(t,e,n,a){var r=(a._originalDate||t).getTimezoneOffset();switch(e){case"x":return z(r);case"xxxx":case"xx":return H(r);case"xxxxx":case"xxx":default:return H(r,":")}},O:function(t,e,n,a){var r=(a._originalDate||t).getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+B(r,":");case"OOOO":default:return"GMT"+H(r,":")}},z:function(t,e,n,a){var r=(a._originalDate||t).getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+B(r,":");case"zzzz":default:return"GMT"+H(r,":")}},t:function(t,e,n,a){var r=a._originalDate||t;return k(Math.floor(r.getTime()/1e3),e.length)},T:function(t,e,n,a){return k((a._originalDate||t).getTime(),e.length)}};function X(t,e){switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});case"PPPP":default:return e.date({width:"full"})}}function J(t,e){switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});case"pppp":default:return e.time({width:"full"})}}const Q={p:J,P:function(t,e){var n,a=t.match(/(P+)(p+)?/),r=a[1],o=a[2];if(!o)return X(t,e);switch(r){case"P":n=e.dateTime({width:"short"});break;case"PP":n=e.dateTime({width:"medium"});break;case"PPP":n=e.dateTime({width:"long"});break;case"PPPP":default:n=e.dateTime({width:"full"})}return n.replace("{{date}}",X(r,e)).replace("{{time}}",J(o,e))}};var G=6e4;function R(t){return t.getTime()%G}function I(t){var e=new Date(t.getTime()),n=Math.ceil(e.getTimezoneOffset());e.setSeconds(0,0);var a=n>0?(G+R(e))%G:R(e);return n*G+a}var _=["D","DD"],K=["YY","YYYY"];function V(t){return-1!==_.indexOf(t)}function $(t){return-1!==K.indexOf(t)}function Z(t,e,n){if("YYYY"===t)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("YY"===t)throw new RangeError("Use `yy` instead of `YY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("D"===t)throw new RangeError("Use `d` instead of `D` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("DD"===t)throw new RangeError("Use `dd` instead of `DD` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"))}var tt=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,et=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,nt=/^'([^]*?)'?$/,at=/''/g,rt=/[a-zA-Z]/;function ot(t,e,n){r(2,arguments);var a=String(e),i=n||{},s=i.locale||y,c=s.options&&s.options.firstWeekContainsDate,l=null==c?1:u(c),h=null==i.firstWeekContainsDate?l:u(i.firstWeekContainsDate);if(!(h>=1&&h<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var f=s.options&&s.options.weekStartsOn,m=null==f?0:u(f),g=null==i.weekStartsOn?m:u(i.weekStartsOn);if(!(g>=0&&g<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!s.localize)throw new RangeError("locale must contain localize property");if(!s.formatLong)throw new RangeError("locale must contain formatLong property");var p=o(t);if(!d(p))throw new RangeError("Invalid time value");var w=I(p),v=b(p,w),k={firstWeekContainsDate:h,weekStartsOn:g,locale:s,_originalDate:p},C=a.match(et).map((function(t){var e=t[0];return"p"===e||"P"===e?(0,Q[e])(t,s.formatLong,k):t})).join("").match(tt).map((function(n){if("''"===n)return"'";var a=n[0];if("'"===a)return it(n);var r=F[a];if(r)return!i.useAdditionalWeekYearTokens&&$(n)&&Z(n,e,t),!i.useAdditionalDayOfYearTokens&&V(n)&&Z(n,e,t),r(v,n,s.localize,k);if(a.match(rt))throw new RangeError("Format string contains an unescaped latin alphabet character `"+a+"`");return n})).join("");return C}function it(t){return t.match(nt)[1].replace(at,"'")}function st(t,e){r(2,arguments);var n=o(t),a=o(e);return n.getFullYear()===a.getFullYear()}function ut(t){return r(1,arguments),o(t).getTime()>Date.now()}var ct={clearDOM:function(){const t=document.querySelector("#tasklist"),e=document.querySelector("#projlist");for(;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)e.removeChild(e.firstChild)},sortTaskArray:function(t){return t.sort((function(t,e){return t.project>e.project?1:-1}))},buildProjectArray:function(t){let e=[];return t.forEach((t=>{e.includes(t.project)||""===t.project||e.push(t.project)})),e.sort((function(t,e){return t>e?1:-1}))},displayDate:function(t){let e=new Date;return function(t){return r(1,arguments),s(t,Date.now())}(t)?"Today":function(t){return r(1,arguments),s(t,c(Date.now(),1))}(t)?"Tomorrow":parseInt((t-i(e))/864e5)<=6&&(t-i(e))/864e5>1?ot(t,"eee"):function(t){return r(1,arguments),st(t,Date.now())}(t)?(ut(t),ot(t,"MMM d")):(ut(t),ot(t,"MMM yyyy"))},ulToArray:function(t){let e=[];return t.childNodes.forEach((t=>{""===t.textContent||t.classList.contains("addChecklistItem")||e.push(t.textContent)})),e},displayElement:function(t){const e=document.querySelector("#tasklist"),r=document.createElement("div");r.classList.add("taskWrapper");const o=document.createElement("div");o.classList.add("taskBullet"),o.addEventListener("click",(e=>{if(!e.target.classList.contains("dontCheck")){e.target.parentNode.querySelector(".taskDetails").style.display="none",e.target.parentNode.querySelector(".taskButtons").style.display="none",e.target.parentNode.classList.remove("selected");const a=document.createElement("span");a.classList.add("checkmark"),a.classList.add("dontCheck"),a.textContent="✓",e.target.appendChild(a),e.target.style.borderColor="lightgray",e.target.parentNode.querySelector(".taskTitle").style.color="lightgray",e.target.parentNode.querySelector(".taskTitle").style.textDecoration="line-through",e.target.parentNode.querySelector(".taskTitle").style.textDecorationThickness="2px",e.target.parentNode.querySelector(".taskTitle").style.cursor="default",e.target.parentNode.querySelector(".taskTitle").contentEditable="false",e.target.parentNode.querySelector(".taskTitle").classList.add("dontOpen"),n(t),e.target.classList.add("dontCheck")}})),r.appendChild(o);const i=document.createElement("div");i.classList.add("taskModule");const s=document.createElement("div");s.classList.add("taskTitleAndControls");const u=document.createElement("div");u.classList.add("taskTitle"),u.textContent=t.task,u.addEventListener("click",(t=>{t.target.classList.contains("dontOpen")||(document.querySelectorAll(".taskWrapper").forEach((e=>{t.target!==e.querySelector(".taskTitle")&&(e.classList.remove("selected"),e.querySelector(".taskTitle").contentEditable="false",e.querySelector(".taskDetails").style.display="none",e.querySelector(".taskButtons").style.display="none")})),t.target.style.cursor="text",t.target.contentEditable="true",t.target.parentNode.parentNode.querySelector(".taskDetails").style.display="block",t.target.parentNode.parentNode.querySelector(".taskButtons").style.display="block",t.target.parentNode.parentNode.parentNode.classList.add("selected"))})),s.appendChild(u);const c=document.createElement("div");c.classList.add("taskButtons");const d=document.createElement("div");d.textContent="🗑",d.classList.add("taskDelete"),d.addEventListener("click",(()=>{n(t),ct.clearDOM(),ct.pagePopulate(ct.sortTaskArray(JSON.parse(localStorage.taskArray)))})),c.appendChild(d);const l=document.createElement("div");l.textContent="🆗",l.classList.add("taskSubmit"),l.addEventListener("click",(e=>{let n;if(e.target.parentNode.parentNode.parentNode.querySelector(".dueDate").value){let t=e.target.parentNode.parentNode.parentNode.querySelector(".dueDate").value.split("-");n=new Date(t[0],t[1]-1,t[2])}else n=t.dueDate;a(t,e.target.parentNode.parentNode.parentNode.querySelector(".taskTitle").textContent,e.target.parentNode.parentNode.parentNode.querySelector(".notes").textContent,n,ct.ulToArray(e.target.parentNode.parentNode.parentNode.querySelector(".checklist")),t.project),ct.clearDOM(),ct.pagePopulate(ct.sortTaskArray(JSON.parse(localStorage.taskArray)))})),c.appendChild(l),s.appendChild(c),i.appendChild(s);const h=document.createElement("div");h.classList.add("taskDetails"),i.appendChild(h);const f=document.createElement("p");f.textContent=t.notes,f.classList.add("notes"),f.contentEditable="true",h.appendChild(f);const m=document.createElement("input");m.type="date",m.setAttribute("data-date",ct.displayDate(Date.parse(t.dueDate))),m.classList.add("dueDate"),m.addEventListener("change",(t=>{let e=t.target.value.split("-"),n=new Date(e[0],e[1]-1,e[2]);t.target.setAttribute("data-date",ct.displayDate(n))})),h.appendChild(m);const g=document.createElement("ul");g.classList.add("checklist"),t.checklist.forEach((t=>{const e=document.createElement("li");e.textContent=t,e.contentEditable="true",g.appendChild(e)}));const p=document.createElement("div");p.classList.add("addChecklistItem"),p.textContent="+",p.classList.add("addChecklistItem"),p.addEventListener("click",(()=>{const t=document.createElement("li");t.textContent="",t.contentEditable="true",g.insertBefore(t,g.lastChild)})),g.appendChild(p),h.appendChild(g),r.appendChild(i),e.appendChild(r)},pagePopulate:function(n){const a=document.querySelector("#tasklist"),r=document.querySelector("#projlist");n.filter((t=>""===t.project)).forEach((t=>ct.displayElement(t)));const o=document.createElement("div");o.classList.add("addToDo"),o.textContent="+",o.addEventListener("click",(n=>{e(t("(new todo)","(notes)",new Date,["(checklist item)"],"")),ct.clearDOM(),ct.pagePopulate(ct.sortTaskArray(JSON.parse(localStorage.taskArray)))})),a.appendChild(o);let i=ct.buildProjectArray(n);i.forEach((r=>{const o=document.createElement("h2");o.textContent=r,a.appendChild(o),n.filter((t=>t.project===r)).forEach((t=>ct.displayElement(t)));const i=document.createElement("div");i.textContent="+",i.classList.add("addToDo"),i.addEventListener("click",(n=>{e(t("(new todo)","(notes)",new Date,["(checklist item)"],r)),ct.clearDOM(),ct.pagePopulate(ct.sortTaskArray(JSON.parse(localStorage.taskArray)))})),a.appendChild(i)})),i.forEach((t=>{const e=document.createElement("h4");e.textContent=t,r.appendChild(e)}));const s=document.createElement("div");s.classList.add("addProject"),s.textContent="+",s.addEventListener("click",(()=>{e(t("[ADD TASK]","[ADD NOTES]",new Date,["[ADD CHECKLIST]"],prompt("What do you want to title your project?"))),ct.clearDOM(),ct.pagePopulate(JSON.parse(localStorage.taskArray))})),r.appendChild(s)}};let dt=[],lt={task:"Buy a Mac.",notes:"Now!",dueDate:new Date,checklist:["Select","Purchase"],project:"Shopping"},ht={task:"Buy an iPhone.",notes:"Now!",dueDate:new Date,checklist:["Select","Purchase"],project:"Shopping"};dt.push(lt),dt.push(ht),localStorage.taskArray=JSON.stringify(dt),localStorage.taskArray&&ct.pagePopulate(ct.sortTaskArray(JSON.parse(localStorage.taskArray)))})();