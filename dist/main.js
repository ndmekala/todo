(()=>{"use strict";var t=function(t,e,n,r,a,o){return{task:t,notes:e,dueDate:n,priority:r,checklist:a,project:o}},e=function(t){let e;e=localStorage.taskArray?JSON.parse(localStorage.taskArray):[],e.push(t),localStorage.taskArray=JSON.stringify(e)},n=function(t){let e=JSON.parse(localStorage.taskArray),n=e.findIndex((e=>e.task===t.task&&e.notes===t.notes&&e.dueDate===t.dueDate&&e.priority===t.priority&&e.checklist===t.checklist&&e.project===t.project));e.splice(n,1),localStorage.taskArray=JSON.stringify(e)},r=function(t,e,n,r,a,o,i){let u=JSON.parse(localStorage.taskArray),s=u.findIndex((e=>{return e.task===t.task&&e.notes===t.notes&&e.dueDate===t.dueDate&&e.priority===t.priority&&(n=e.checklist,r=t.checklist,Array.isArray(n)&&Array.isArray(r)&&n.length===r.length&&n.every(((t,e)=>t===r[e])))&&e.project===t.project;var n,r}));u[s].task=e,u[s].notes=n,u[s].dueDate=r,u[s].priority=a,u[s].checklist=o,u[s].project=i,localStorage.taskArray=JSON.stringify(u)};function a(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function o(t){a(1,arguments);var e=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===e?new Date(t.getTime()):"number"==typeof t||"[object Number]"===e?new Date(t):("string"!=typeof t&&"[object String]"!==e||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function i(t){a(1,arguments);var e=o(t);return e.setHours(0,0,0,0),e}function u(t,e){a(2,arguments);var n=i(t),r=i(e);return n.getTime()===r.getTime()}function s(t){if(null===t||!0===t||!1===t)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function c(t,e){a(2,arguments);var n=o(t),r=s(e);return isNaN(r)?new Date(NaN):r?(n.setDate(n.getDate()+r),n):n}function d(t){a(1,arguments);var e=o(t);return!isNaN(e)}var l={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function h(t){return function(e){var n=e||{},r=n.width?String(n.width):t.defaultWidth;return t.formats[r]||t.formats[t.defaultWidth]}}var f,m={date:h({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:h({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:h({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},g={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function w(t){return function(e,n){var r,a=n||{};if("formatting"===(a.context?String(a.context):"standalone")&&t.formattingValues){var o=t.defaultFormattingWidth||t.defaultWidth,i=a.width?String(a.width):o;r=t.formattingValues[i]||t.formattingValues[o]}else{var u=t.defaultWidth,s=a.width?String(a.width):t.defaultWidth;r=t.values[s]||t.values[u]}return r[t.argumentCallback?t.argumentCallback(e):e]}}function y(t){return function(e,n){var r=String(e),a=n||{},o=a.width,i=o&&t.matchPatterns[o]||t.matchPatterns[t.defaultMatchWidth],u=r.match(i);if(!u)return null;var s,c=u[0],d=o&&t.parsePatterns[o]||t.parsePatterns[t.defaultParseWidth];return s="[object Array]"===Object.prototype.toString.call(d)?function(t,e){for(var n=0;n<t.length;n++)if(t[n].test(c))return n}(d):function(t,e){for(var n in t)if(t.hasOwnProperty(n)&&t[n].test(c))return n}(d),s=t.valueCallback?t.valueCallback(s):s,{value:s=a.valueCallback?a.valueCallback(s):s,rest:r.slice(c.length)}}}const p={code:"en-US",formatDistance:function(t,e,n){var r;return n=n||{},r="string"==typeof l[t]?l[t]:1===e?l[t].one:l[t].other.replace("{{count}}",e),n.addSuffix?n.comparison>0?"in "+r:r+" ago":r},formatLong:m,formatRelative:function(t,e,n,r){return g[t]},localize:{ordinalNumber:function(t,e){var n=Number(t),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:w({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:w({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(t){return Number(t)-1}}),month:w({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:w({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:w({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(f={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(t){return parseInt(t,10)}},function(t,e){var n=String(t),r=e||{},a=n.match(f.matchPattern);if(!a)return null;var o=a[0],i=n.match(f.parsePattern);if(!i)return null;var u=f.valueCallback?f.valueCallback(i[0]):i[0];return{value:u=r.valueCallback?r.valueCallback(u):u,rest:n.slice(o.length)}}),era:y({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:y({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(t){return t+1}}),month:y({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:y({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:y({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function v(t,e){a(2,arguments);var n=o(t).getTime(),r=s(e);return new Date(n+r)}function b(t,e){a(2,arguments);var n=s(e);return v(t,-n)}function C(t,e){for(var n=t<0?"-":"",r=Math.abs(t).toString();r.length<e;)r="0"+r;return n+r}const T=function(t,e){var n=t.getUTCFullYear(),r=n>0?n:1-n;return C("yy"===e?r%100:r,e.length)},k=function(t,e){var n=t.getUTCMonth();return"M"===e?String(n+1):C(n+1,2)},D=function(t,e){return C(t.getUTCDate(),e.length)},M=function(t,e){return C(t.getUTCHours()%12||12,e.length)},S=function(t,e){return C(t.getUTCHours(),e.length)},x=function(t,e){return C(t.getUTCMinutes(),e.length)},E=function(t,e){return C(t.getUTCSeconds(),e.length)},P=function(t,e){var n=e.length,r=t.getUTCMilliseconds();return C(Math.floor(r*Math.pow(10,n-3)),e.length)};var N=864e5;function U(t){a(1,arguments);var e=1,n=o(t),r=n.getUTCDay(),i=(r<e?7:0)+r-e;return n.setUTCDate(n.getUTCDate()-i),n.setUTCHours(0,0,0,0),n}function O(t){a(1,arguments);var e=o(t),n=e.getUTCFullYear(),r=new Date(0);r.setUTCFullYear(n+1,0,4),r.setUTCHours(0,0,0,0);var i=U(r),u=new Date(0);u.setUTCFullYear(n,0,4),u.setUTCHours(0,0,0,0);var s=U(u);return e.getTime()>=i.getTime()?n+1:e.getTime()>=s.getTime()?n:n-1}function q(t){a(1,arguments);var e=O(t),n=new Date(0);n.setUTCFullYear(e,0,4),n.setUTCHours(0,0,0,0);var r=U(n);return r}var W=6048e5;function Y(t,e){a(1,arguments);var n=e||{},r=n.locale,i=r&&r.options&&r.options.weekStartsOn,u=null==i?0:s(i),c=null==n.weekStartsOn?u:s(n.weekStartsOn);if(!(c>=0&&c<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var d=o(t),l=d.getUTCDay(),h=(l<c?7:0)+l-c;return d.setUTCDate(d.getUTCDate()-h),d.setUTCHours(0,0,0,0),d}function A(t,e){a(1,arguments);var n=o(t,e),r=n.getUTCFullYear(),i=e||{},u=i.locale,c=u&&u.options&&u.options.firstWeekContainsDate,d=null==c?1:s(c),l=null==i.firstWeekContainsDate?d:s(i.firstWeekContainsDate);if(!(l>=1&&l<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var h=new Date(0);h.setUTCFullYear(r+1,0,l),h.setUTCHours(0,0,0,0);var f=Y(h,e),m=new Date(0);m.setUTCFullYear(r,0,l),m.setUTCHours(0,0,0,0);var g=Y(m,e);return n.getTime()>=f.getTime()?r+1:n.getTime()>=g.getTime()?r:r-1}function j(t,e){a(1,arguments);var n=e||{},r=n.locale,o=r&&r.options&&r.options.firstWeekContainsDate,i=null==o?1:s(o),u=null==n.firstWeekContainsDate?i:s(n.firstWeekContainsDate),c=A(t,e),d=new Date(0);d.setUTCFullYear(c,0,u),d.setUTCHours(0,0,0,0);var l=Y(d,e);return l}var L=6048e5;function z(t,e){var n=t>0?"-":"+",r=Math.abs(t),a=Math.floor(r/60),o=r%60;if(0===o)return n+String(a);var i=e||"";return n+String(a)+i+C(o,2)}function B(t,e){return t%60==0?(t>0?"-":"+")+C(Math.abs(t)/60,2):H(t,e)}function H(t,e){var n=e||"",r=t>0?"-":"+",a=Math.abs(t);return r+C(Math.floor(a/60),2)+n+C(a%60,2)}const F={G:function(t,e,n){var r=t.getUTCFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});case"GGGG":default:return n.era(r,{width:"wide"})}},y:function(t,e,n){if("yo"===e){var r=t.getUTCFullYear(),a=r>0?r:1-r;return n.ordinalNumber(a,{unit:"year"})}return T(t,e)},Y:function(t,e,n,r){var a=A(t,r),o=a>0?a:1-a;return"YY"===e?C(o%100,2):"Yo"===e?n.ordinalNumber(o,{unit:"year"}):C(o,e.length)},R:function(t,e){return C(O(t),e.length)},u:function(t,e){return C(t.getUTCFullYear(),e.length)},Q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"Q":return String(r);case"QQ":return C(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"q":return String(r);case"qq":return C(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(t,e,n){var r=t.getUTCMonth();switch(e){case"M":case"MM":return k(t,e);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(t,e,n){var r=t.getUTCMonth();switch(e){case"L":return String(r+1);case"LL":return C(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(t,e,n,r){var i=function(t,e){a(1,arguments);var n=o(t),r=Y(n,e).getTime()-j(n,e).getTime();return Math.round(r/L)+1}(t,r);return"wo"===e?n.ordinalNumber(i,{unit:"week"}):C(i,e.length)},I:function(t,e,n){var r=function(t){a(1,arguments);var e=o(t),n=U(e).getTime()-q(e).getTime();return Math.round(n/W)+1}(t);return"Io"===e?n.ordinalNumber(r,{unit:"week"}):C(r,e.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getUTCDate(),{unit:"date"}):D(t,e)},D:function(t,e,n){var r=function(t){a(1,arguments);var e=o(t),n=e.getTime();e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0);var r=e.getTime(),i=n-r;return Math.floor(i/N)+1}(t);return"Do"===e?n.ordinalNumber(r,{unit:"dayOfYear"}):C(r,e.length)},E:function(t,e,n){var r=t.getUTCDay();switch(e){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});case"EEEE":default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(t,e,n,r){var a=t.getUTCDay(),o=(a-r.weekStartsOn+8)%7||7;switch(e){case"e":return String(o);case"ee":return C(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});case"eeee":default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(t,e,n,r){var a=t.getUTCDay(),o=(a-r.weekStartsOn+8)%7||7;switch(e){case"c":return String(o);case"cc":return C(o,e.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});case"cccc":default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(t,e,n){var r=t.getUTCDay(),a=0===r?7:r;switch(e){case"i":return String(a);case"ii":return C(a,e.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});case"iiii":default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(t,e,n){var r=t.getUTCHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(t,e,n){var r,a=t.getUTCHours();switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(t,e,n){var r,a=t.getUTCHours();switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){var r=t.getUTCHours()%12;return 0===r&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return M(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getUTCHours(),{unit:"hour"}):S(t,e)},K:function(t,e,n){var r=t.getUTCHours()%12;return"Ko"===e?n.ordinalNumber(r,{unit:"hour"}):C(r,e.length)},k:function(t,e,n){var r=t.getUTCHours();return 0===r&&(r=24),"ko"===e?n.ordinalNumber(r,{unit:"hour"}):C(r,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getUTCMinutes(),{unit:"minute"}):x(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getUTCSeconds(),{unit:"second"}):E(t,e)},S:function(t,e){return P(t,e)},X:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();if(0===a)return"Z";switch(e){case"X":return B(a);case"XXXX":case"XX":return H(a);case"XXXXX":case"XXX":default:return H(a,":")}},x:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"x":return B(a);case"xxxx":case"xx":return H(a);case"xxxxx":case"xxx":default:return H(a,":")}},O:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+z(a,":");case"OOOO":default:return"GMT"+H(a,":")}},z:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+z(a,":");case"zzzz":default:return"GMT"+H(a,":")}},t:function(t,e,n,r){var a=r._originalDate||t;return C(Math.floor(a.getTime()/1e3),e.length)},T:function(t,e,n,r){return C((r._originalDate||t).getTime(),e.length)}};function X(t,e){switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});case"PPPP":default:return e.date({width:"full"})}}function Q(t,e){switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});case"pppp":default:return e.time({width:"full"})}}const G={p:Q,P:function(t,e){var n,r=t.match(/(P+)(p+)?/),a=r[1],o=r[2];if(!o)return X(t,e);switch(a){case"P":n=e.dateTime({width:"short"});break;case"PP":n=e.dateTime({width:"medium"});break;case"PPP":n=e.dateTime({width:"long"});break;case"PPPP":default:n=e.dateTime({width:"full"})}return n.replace("{{date}}",X(a,e)).replace("{{time}}",Q(o,e))}};var J=6e4;function I(t){return t.getTime()%J}function R(t){var e=new Date(t.getTime()),n=Math.ceil(e.getTimezoneOffset());e.setSeconds(0,0);var r=n>0?(J+I(e))%J:I(e);return n*J+r}var _=["D","DD"],V=["YY","YYYY"];function K(t){return-1!==_.indexOf(t)}function $(t){return-1!==V.indexOf(t)}function Z(t,e,n){if("YYYY"===t)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("YY"===t)throw new RangeError("Use `yy` instead of `YY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("D"===t)throw new RangeError("Use `d` instead of `D` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("DD"===t)throw new RangeError("Use `dd` instead of `DD` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"))}var tt=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,et=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,nt=/^'([^]*?)'?$/,rt=/''/g,at=/[a-zA-Z]/;function ot(t,e,n){a(2,arguments);var r=String(e),i=n||{},u=i.locale||p,c=u.options&&u.options.firstWeekContainsDate,l=null==c?1:s(c),h=null==i.firstWeekContainsDate?l:s(i.firstWeekContainsDate);if(!(h>=1&&h<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var f=u.options&&u.options.weekStartsOn,m=null==f?0:s(f),g=null==i.weekStartsOn?m:s(i.weekStartsOn);if(!(g>=0&&g<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!u.localize)throw new RangeError("locale must contain localize property");if(!u.formatLong)throw new RangeError("locale must contain formatLong property");var w=o(t);if(!d(w))throw new RangeError("Invalid time value");var y=R(w),v=b(w,y),C={firstWeekContainsDate:h,weekStartsOn:g,locale:u,_originalDate:w},T=r.match(et).map((function(t){var e=t[0];return"p"===e||"P"===e?(0,G[e])(t,u.formatLong,C):t})).join("").match(tt).map((function(n){if("''"===n)return"'";var r=n[0];if("'"===r)return it(n);var a=F[r];if(a)return!i.useAdditionalWeekYearTokens&&$(n)&&Z(n,e,t),!i.useAdditionalDayOfYearTokens&&K(n)&&Z(n,e,t),a(v,n,u.localize,C);if(r.match(at))throw new RangeError("Format string contains an unescaped latin alphabet character `"+r+"`");return n})).join("");return T}function it(t){return t.match(nt)[1].replace(rt,"'")}function ut(t,e){a(2,arguments);var n=o(t),r=o(e);return n.getFullYear()===r.getFullYear()}function st(t){return a(1,arguments),o(t).getTime()>Date.now()}var ct=function(){let o=!1;const s=document.querySelector("#add");return s.addEventListener("click",(()=>{o?(document.querySelector("#my-form").style.display="none",s.textContent="+"):(document.querySelector("#my-form").style.display="block",s.textContent="–"),o=!o})),document.querySelector("#newtodo").addEventListener("click",(()=>{let n=document.getElementById("task").value,r=document.getElementById("notes").value,a=new Date,o=document.getElementById("priority").value,i=document.getElementById("checklist").value,u=document.getElementById("project").value;e(t(n,r,a,o,i,u)),ct.clearDOM(),ct.pagePopulate(ct.sortTaskArray(JSON.parse(localStorage.taskArray))),document.querySelector("#my-form").style.display="none"})),{clearDOM:function(){const t=document.querySelector("#tasklist"),e=document.querySelector("#projlist");for(;t.firstChild;)t.removeChild(t.firstChild);for(t.innerHTML+="<h1>Checklist ✅</h1>";e.firstChild;)e.removeChild(e.firstChild)},sortTaskArray:function(t){return t.sort((function(t,e){return t.project>e.project?1:-1}))},buildProjectArray:function(t){let e=[];return t.forEach((t=>{e.includes(t.project)||e.push(t.project)})),e.sort((function(t,e){return t>e?1:-1}))},displayDate:function(t){let e=new Date;return function(t){return a(1,arguments),u(t,Date.now())}(t)?"Today":function(t){return a(1,arguments),u(t,c(Date.now(),1))}(t)?"Tomorrow":parseInt((t-i(e))/864e5)<=6&&(t-i(e))/864e5>1?ot(t,"eee"):function(t){return a(1,arguments),ut(t,Date.now())}(t)?(st(t),ot(t,"MMM d")):(st(t),ot(t,"MMM yyyy"))},ulToArray:function(t){let e=[];return t.childNodes.forEach((t=>{""!==t.textContent&&e.push(t.textContent)})),e},pagePopulate:function(t){const e=document.querySelector("#tasklist"),a=document.querySelector("#projlist");let o=ct.buildProjectArray(t);o.forEach((a=>{const o=document.createElement("h2");o.textContent=a,e.appendChild(o),t.filter((t=>t.project===a)).forEach((t=>(t=>{const a=document.createElement("div");a.classList.add("taskBox");const o=document.createElement("h4");o.textContent=t.task,o.classList.add("task"),o.addEventListener("click",(t=>{t.target.contentEditable="true",t.target.parentNode.querySelector(".taskDetails").style.display="block"})),a.appendChild(o);const i=document.createElement("div");i.classList.add("taskDetails"),a.appendChild(i);const u=document.createElement("p");u.textContent=t.notes,u.classList.add("notes"),u.contentEditable="true",i.appendChild(u);const s=document.createElement("input");s.type="date",s.setAttribute("data-date",ct.displayDate(Date.parse(t.dueDate))),s.classList.add("dueDate"),s.addEventListener("change",(t=>{let e=t.target.value.split("-"),n=new Date(e[0],e[1]-1,e[2]);t.target.setAttribute("data-date",ct.displayDate(n))})),i.appendChild(s);const c=document.createElement("p");c.textContent=t.priority,c.classList.add("priority"),c.contentEditable="true",i.appendChild(c);const d=document.createElement("ul");d.classList.add("checklist"),t.checklist.forEach((t=>{const e=document.createElement("li");e.textContent=t,e.contentEditable="true",d.appendChild(e)}));const l=document.createElement("div");l.textContent="+",l.addEventListener("click",(()=>{const t=document.createElement("li");t.textContent="",t.contentEditable="true",d.insertBefore(t,d.lastChild)})),d.appendChild(l),i.appendChild(d);const h=document.createElement("button");h.textContent="Delete",h.addEventListener("click",(()=>{n(t),ct.clearDOM(),ct.pagePopulate(ct.sortTaskArray(JSON.parse(localStorage.taskArray)))})),i.appendChild(h);const f=document.createElement("button");f.textContent="Submit",f.addEventListener("click",(e=>{let n;if(e.target.parentNode.querySelector(".dueDate").value){let t=e.target.parentNode.querySelector(".dueDate").value.split("-");n=new Date(t[0],t[1]-1,t[2])}else n=t.dueDate;r(t,e.target.parentNode.parentNode.querySelector(".task").textContent,e.target.parentNode.querySelector(".notes").textContent,n,e.target.parentNode.querySelector(".priority").textContent,ct.ulToArray(e.target.parentNode.querySelector(".checklist")),t.project),ct.clearDOM(),ct.pagePopulate(ct.sortTaskArray(JSON.parse(localStorage.taskArray)))})),i.appendChild(f),e.appendChild(a)})(t)))})),o.forEach((t=>{const e=document.createElement("h4");e.textContent=t,a.appendChild(e)}))}}}();localStorage.taskArray&&ct.pagePopulate(JSON.parse(localStorage.taskArray))})();