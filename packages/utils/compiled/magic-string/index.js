(function(){var t={961:function(t,e){(function(t,n){true?n(e):0})(this,(function(t){"use strict";const e=",".charCodeAt(0);const n=";".charCodeAt(0);const i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";const r=new Uint8Array(64);const s=new Uint8Array(128);for(let t=0;t<i.length;t++){const e=i.charCodeAt(t);r[t]=e;s[e]=t}const o=typeof TextDecoder!=="undefined"?new TextDecoder:typeof Buffer!=="undefined"?{decode(t){const e=Buffer.from(t.buffer,t.byteOffset,t.byteLength);return e.toString()}}:{decode(t){let e="";for(let n=0;n<t.length;n++){e+=String.fromCharCode(t[n])}return e}};function decode(t){const e=new Int32Array(5);const n=[];let i=0;do{const r=indexOf(t,i);const s=[];let o=true;let h=0;e[0]=0;for(let n=i;n<r;n++){let i;n=decodeInteger(t,n,e,0);const a=e[0];if(a<h)o=false;h=a;if(hasMoreVlq(t,n,r)){n=decodeInteger(t,n,e,1);n=decodeInteger(t,n,e,2);n=decodeInteger(t,n,e,3);if(hasMoreVlq(t,n,r)){n=decodeInteger(t,n,e,4);i=[a,e[1],e[2],e[3],e[4]]}else{i=[a,e[1],e[2],e[3]]}}else{i=[a]}s.push(i)}if(!o)sort(s);n.push(s);i=r+1}while(i<=t.length);return n}function indexOf(t,e){const n=t.indexOf(";",e);return n===-1?t.length:n}function decodeInteger(t,e,n,i){let r=0;let o=0;let h=0;do{const n=t.charCodeAt(e++);h=s[n];r|=(h&31)<<o;o+=5}while(h&32);const a=r&1;r>>>=1;if(a){r=-2147483648|-r}n[i]+=r;return e}function hasMoreVlq(t,n,i){if(n>=i)return false;return t.charCodeAt(n)!==e}function sort(t){t.sort(sortComparator)}function sortComparator(t,e){return t[0]-e[0]}function encode(t){const i=new Int32Array(5);const r=1024*16;const s=r-36;const h=new Uint8Array(r);const a=h.subarray(0,s);let l=0;let u="";for(let c=0;c<t.length;c++){const d=t[c];if(c>0){if(l===r){u+=o.decode(h);l=0}h[l++]=n}if(d.length===0)continue;i[0]=0;for(let t=0;t<d.length;t++){const n=d[t];if(l>s){u+=o.decode(a);h.copyWithin(0,s,l);l-=s}if(t>0)h[l++]=e;l=encodeInteger(h,l,i,n,0);if(n.length===1)continue;l=encodeInteger(h,l,i,n,1);l=encodeInteger(h,l,i,n,2);l=encodeInteger(h,l,i,n,3);if(n.length===4)continue;l=encodeInteger(h,l,i,n,4)}}return u+o.decode(h.subarray(0,l))}function encodeInteger(t,e,n,i,s){const o=i[s];let h=o-n[s];n[s]=o;h=h<0?-h<<1|1:h<<1;do{let n=h&31;h>>>=5;if(h>0)n|=32;t[e++]=r[n]}while(h>0);return e}t.decode=decode;t.encode=encode;Object.defineProperty(t,"__esModule",{value:true})}))},712:function(t,e,n){"use strict";var i=n(961);class BitSet{constructor(t){this.bits=t instanceof BitSet?t.bits.slice():[]}add(t){this.bits[t>>5]|=1<<(t&31)}has(t){return!!(this.bits[t>>5]&1<<(t&31))}}class Chunk{constructor(t,e,n){this.start=t;this.end=e;this.original=n;this.intro="";this.outro="";this.content=n;this.storeName=false;this.edited=false;{this.previous=null;this.next=null}}appendLeft(t){this.outro+=t}appendRight(t){this.intro=this.intro+t}clone(){const t=new Chunk(this.start,this.end,this.original);t.intro=this.intro;t.outro=this.outro;t.content=this.content;t.storeName=this.storeName;t.edited=this.edited;return t}contains(t){return this.start<t&&t<this.end}eachNext(t){let e=this;while(e){t(e);e=e.next}}eachPrevious(t){let e=this;while(e){t(e);e=e.previous}}edit(t,e,n){this.content=t;if(!n){this.intro="";this.outro=""}this.storeName=e;this.edited=true;return this}prependLeft(t){this.outro=t+this.outro}prependRight(t){this.intro=t+this.intro}split(t){const e=t-this.start;const n=this.original.slice(0,e);const i=this.original.slice(e);this.original=n;const r=new Chunk(t,this.end,i);r.outro=this.outro;this.outro="";this.end=t;if(this.edited){r.edit("",false);this.content=""}else{this.content=n}r.next=this.next;if(r.next)r.next.previous=r;r.previous=this;this.next=r;return r}toString(){return this.intro+this.content+this.outro}trimEnd(t){this.outro=this.outro.replace(t,"");if(this.outro.length)return true;const e=this.content.replace(t,"");if(e.length){if(e!==this.content){this.split(this.start+e.length).edit("",undefined,true)}return true}else{this.edit("",undefined,true);this.intro=this.intro.replace(t,"");if(this.intro.length)return true}}trimStart(t){this.intro=this.intro.replace(t,"");if(this.intro.length)return true;const e=this.content.replace(t,"");if(e.length){if(e!==this.content){this.split(this.end-e.length);this.edit("",undefined,true)}return true}else{this.edit("",undefined,true);this.outro=this.outro.replace(t,"");if(this.outro.length)return true}}}function getBtoa(){if(typeof window!=="undefined"&&typeof window.btoa==="function"){return t=>window.btoa(unescape(encodeURIComponent(t)))}else if(typeof Buffer==="function"){return t=>Buffer.from(t,"utf-8").toString("base64")}else{return()=>{throw new Error("Unsupported environment: `window.btoa` or `Buffer` should be supported.")}}}const r=getBtoa();class SourceMap{constructor(t){this.version=3;this.file=t.file;this.sources=t.sources;this.sourcesContent=t.sourcesContent;this.names=t.names;this.mappings=i.encode(t.mappings)}toString(){return JSON.stringify(this)}toUrl(){return"data:application/json;charset=utf-8;base64,"+r(this.toString())}}function guessIndent(t){const e=t.split("\n");const n=e.filter((t=>/^\t+/.test(t)));const i=e.filter((t=>/^ {2,}/.test(t)));if(n.length===0&&i.length===0){return null}if(n.length>=i.length){return"\t"}const r=i.reduce(((t,e)=>{const n=/^ +/.exec(e)[0].length;return Math.min(n,t)}),Infinity);return new Array(r+1).join(" ")}function getRelativePath(t,e){const n=t.split(/[/\\]/);const i=e.split(/[/\\]/);n.pop();while(n[0]===i[0]){n.shift();i.shift()}if(n.length){let t=n.length;while(t--)n[t]=".."}return n.concat(i).join("/")}const s=Object.prototype.toString;function isObject(t){return s.call(t)==="[object Object]"}function getLocator(t){const e=t.split("\n");const n=[];for(let t=0,i=0;t<e.length;t++){n.push(i);i+=e[t].length+1}return function locate(t){let e=0;let i=n.length;while(e<i){const r=e+i>>1;if(t<n[r]){i=r}else{e=r+1}}const r=e-1;const s=t-n[r];return{line:r,column:s}}}class Mappings{constructor(t){this.hires=t;this.generatedCodeLine=0;this.generatedCodeColumn=0;this.raw=[];this.rawSegments=this.raw[this.generatedCodeLine]=[];this.pending=null}addEdit(t,e,n,i){if(e.length){const e=[this.generatedCodeColumn,t,n.line,n.column];if(i>=0){e.push(i)}this.rawSegments.push(e)}else if(this.pending){this.rawSegments.push(this.pending)}this.advance(e);this.pending=null}addUneditedChunk(t,e,n,i,r){let s=e.start;let o=true;while(s<e.end){if(this.hires||o||r.has(s)){this.rawSegments.push([this.generatedCodeColumn,t,i.line,i.column])}if(n[s]==="\n"){i.line+=1;i.column=0;this.generatedCodeLine+=1;this.raw[this.generatedCodeLine]=this.rawSegments=[];this.generatedCodeColumn=0;o=true}else{i.column+=1;this.generatedCodeColumn+=1;o=false}s+=1}this.pending=null}advance(t){if(!t)return;const e=t.split("\n");if(e.length>1){for(let t=0;t<e.length-1;t++){this.generatedCodeLine++;this.raw[this.generatedCodeLine]=this.rawSegments=[]}this.generatedCodeColumn=0}this.generatedCodeColumn+=e[e.length-1].length}}const o="\n";const h={insertLeft:false,insertRight:false,storeName:false};class MagicString{constructor(t,e={}){const n=new Chunk(0,t.length,t);Object.defineProperties(this,{original:{writable:true,value:t},outro:{writable:true,value:""},intro:{writable:true,value:""},firstChunk:{writable:true,value:n},lastChunk:{writable:true,value:n},lastSearchedChunk:{writable:true,value:n},byStart:{writable:true,value:{}},byEnd:{writable:true,value:{}},filename:{writable:true,value:e.filename},indentExclusionRanges:{writable:true,value:e.indentExclusionRanges},sourcemapLocations:{writable:true,value:new BitSet},storedNames:{writable:true,value:{}},indentStr:{writable:true,value:undefined}});this.byStart[0]=n;this.byEnd[t.length]=n}addSourcemapLocation(t){this.sourcemapLocations.add(t)}append(t){if(typeof t!=="string")throw new TypeError("outro content must be a string");this.outro+=t;return this}appendLeft(t,e){if(typeof e!=="string")throw new TypeError("inserted content must be a string");this._split(t);const n=this.byEnd[t];if(n){n.appendLeft(e)}else{this.intro+=e}return this}appendRight(t,e){if(typeof e!=="string")throw new TypeError("inserted content must be a string");this._split(t);const n=this.byStart[t];if(n){n.appendRight(e)}else{this.outro+=e}return this}clone(){const t=new MagicString(this.original,{filename:this.filename});let e=this.firstChunk;let n=t.firstChunk=t.lastSearchedChunk=e.clone();while(e){t.byStart[n.start]=n;t.byEnd[n.end]=n;const i=e.next;const r=i&&i.clone();if(r){n.next=r;r.previous=n;n=r}e=i}t.lastChunk=n;if(this.indentExclusionRanges){t.indentExclusionRanges=this.indentExclusionRanges.slice()}t.sourcemapLocations=new BitSet(this.sourcemapLocations);t.intro=this.intro;t.outro=this.outro;return t}generateDecodedMap(t){t=t||{};const e=0;const n=Object.keys(this.storedNames);const i=new Mappings(t.hires);const r=getLocator(this.original);if(this.intro){i.advance(this.intro)}this.firstChunk.eachNext((t=>{const s=r(t.start);if(t.intro.length)i.advance(t.intro);if(t.edited){i.addEdit(e,t.content,s,t.storeName?n.indexOf(t.original):-1)}else{i.addUneditedChunk(e,t,this.original,s,this.sourcemapLocations)}if(t.outro.length)i.advance(t.outro)}));return{file:t.file?t.file.split(/[/\\]/).pop():null,sources:[t.source?getRelativePath(t.file||"",t.source):null],sourcesContent:t.includeContent?[this.original]:[null],names:n,mappings:i.raw}}generateMap(t){return new SourceMap(this.generateDecodedMap(t))}_ensureindentStr(){if(this.indentStr===undefined){this.indentStr=guessIndent(this.original)}}_getRawIndentString(){this._ensureindentStr();return this.indentStr}getIndentString(){this._ensureindentStr();return this.indentStr===null?"\t":this.indentStr}indent(t,e){const n=/^[^\r\n]/gm;if(isObject(t)){e=t;t=undefined}if(t===undefined){this._ensureindentStr();t=this.indentStr||"\t"}if(t==="")return this;e=e||{};const i={};if(e.exclude){const t=typeof e.exclude[0]==="number"?[e.exclude]:e.exclude;t.forEach((t=>{for(let e=t[0];e<t[1];e+=1){i[e]=true}}))}let r=e.indentStart!==false;const replacer=e=>{if(r)return`${t}${e}`;r=true;return e};this.intro=this.intro.replace(n,replacer);let s=0;let o=this.firstChunk;while(o){const e=o.end;if(o.edited){if(!i[s]){o.content=o.content.replace(n,replacer);if(o.content.length){r=o.content[o.content.length-1]==="\n"}}}else{s=o.start;while(s<e){if(!i[s]){const e=this.original[s];if(e==="\n"){r=true}else if(e!=="\r"&&r){r=false;if(s===o.start){o.prependRight(t)}else{this._splitChunk(o,s);o=o.next;o.prependRight(t)}}}s+=1}}s=o.end;o=o.next}this.outro=this.outro.replace(n,replacer);return this}insert(){throw new Error("magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)")}insertLeft(t,e){if(!h.insertLeft){console.warn("magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead");h.insertLeft=true}return this.appendLeft(t,e)}insertRight(t,e){if(!h.insertRight){console.warn("magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead");h.insertRight=true}return this.prependRight(t,e)}move(t,e,n){if(n>=t&&n<=e)throw new Error("Cannot move a selection inside itself");this._split(t);this._split(e);this._split(n);const i=this.byStart[t];const r=this.byEnd[e];const s=i.previous;const o=r.next;const h=this.byStart[n];if(!h&&r===this.lastChunk)return this;const a=h?h.previous:this.lastChunk;if(s)s.next=o;if(o)o.previous=s;if(a)a.next=i;if(h)h.previous=r;if(!i.previous)this.firstChunk=r.next;if(!r.next){this.lastChunk=i.previous;this.lastChunk.next=null}i.previous=a;r.next=h||null;if(!a)this.firstChunk=i;if(!h)this.lastChunk=r;return this}overwrite(t,e,n,i){i=i||{};return this.update(t,e,n,{...i,overwrite:!i.contentOnly})}update(t,e,n,i){if(typeof n!=="string")throw new TypeError("replacement content must be a string");while(t<0)t+=this.original.length;while(e<0)e+=this.original.length;if(e>this.original.length)throw new Error("end is out of bounds");if(t===e)throw new Error("Cannot overwrite a zero-length range – use appendLeft or prependRight instead");this._split(t);this._split(e);if(i===true){if(!h.storeName){console.warn("The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string");h.storeName=true}i={storeName:true}}const r=i!==undefined?i.storeName:false;const s=i!==undefined?i.overwrite:false;if(r){const n=this.original.slice(t,e);Object.defineProperty(this.storedNames,n,{writable:true,value:true,enumerable:true})}const o=this.byStart[t];const a=this.byEnd[e];if(o){let t=o;while(t!==a){if(t.next!==this.byStart[t.end]){throw new Error("Cannot overwrite across a split point")}t=t.next;t.edit("",false)}o.edit(n,r,!s)}else{const i=new Chunk(t,e,"").edit(n,r);a.next=i;i.previous=a}return this}prepend(t){if(typeof t!=="string")throw new TypeError("outro content must be a string");this.intro=t+this.intro;return this}prependLeft(t,e){if(typeof e!=="string")throw new TypeError("inserted content must be a string");this._split(t);const n=this.byEnd[t];if(n){n.prependLeft(e)}else{this.intro=e+this.intro}return this}prependRight(t,e){if(typeof e!=="string")throw new TypeError("inserted content must be a string");this._split(t);const n=this.byStart[t];if(n){n.prependRight(e)}else{this.outro=e+this.outro}return this}remove(t,e){while(t<0)t+=this.original.length;while(e<0)e+=this.original.length;if(t===e)return this;if(t<0||e>this.original.length)throw new Error("Character is out of bounds");if(t>e)throw new Error("end must be greater than start");this._split(t);this._split(e);let n=this.byStart[t];while(n){n.intro="";n.outro="";n.edit("");n=e>n.end?this.byStart[n.end]:null}return this}lastChar(){if(this.outro.length)return this.outro[this.outro.length-1];let t=this.lastChunk;do{if(t.outro.length)return t.outro[t.outro.length-1];if(t.content.length)return t.content[t.content.length-1];if(t.intro.length)return t.intro[t.intro.length-1]}while(t=t.previous);if(this.intro.length)return this.intro[this.intro.length-1];return""}lastLine(){let t=this.outro.lastIndexOf(o);if(t!==-1)return this.outro.substr(t+1);let e=this.outro;let n=this.lastChunk;do{if(n.outro.length>0){t=n.outro.lastIndexOf(o);if(t!==-1)return n.outro.substr(t+1)+e;e=n.outro+e}if(n.content.length>0){t=n.content.lastIndexOf(o);if(t!==-1)return n.content.substr(t+1)+e;e=n.content+e}if(n.intro.length>0){t=n.intro.lastIndexOf(o);if(t!==-1)return n.intro.substr(t+1)+e;e=n.intro+e}}while(n=n.previous);t=this.intro.lastIndexOf(o);if(t!==-1)return this.intro.substr(t+1)+e;return this.intro+e}slice(t=0,e=this.original.length){while(t<0)t+=this.original.length;while(e<0)e+=this.original.length;let n="";let i=this.firstChunk;while(i&&(i.start>t||i.end<=t)){if(i.start<e&&i.end>=e){return n}i=i.next}if(i&&i.edited&&i.start!==t)throw new Error(`Cannot use replaced character ${t} as slice start anchor.`);const r=i;while(i){if(i.intro&&(r!==i||i.start===t)){n+=i.intro}const s=i.start<e&&i.end>=e;if(s&&i.edited&&i.end!==e)throw new Error(`Cannot use replaced character ${e} as slice end anchor.`);const o=r===i?t-i.start:0;const h=s?i.content.length+e-i.end:i.content.length;n+=i.content.slice(o,h);if(i.outro&&(!s||i.end===e)){n+=i.outro}if(s){break}i=i.next}return n}snip(t,e){const n=this.clone();n.remove(0,t);n.remove(e,n.original.length);return n}_split(t){if(this.byStart[t]||this.byEnd[t])return;let e=this.lastSearchedChunk;const n=t>e.end;while(e){if(e.contains(t))return this._splitChunk(e,t);e=n?this.byStart[e.end]:this.byEnd[e.start]}}_splitChunk(t,e){if(t.edited&&t.content.length){const n=getLocator(this.original)(e);throw new Error(`Cannot split a chunk that has already been edited (${n.line}:${n.column} – "${t.original}")`)}const n=t.split(e);this.byEnd[e]=t;this.byStart[e]=n;this.byEnd[n.end]=n;if(t===this.lastChunk)this.lastChunk=n;this.lastSearchedChunk=t;return true}toString(){let t=this.intro;let e=this.firstChunk;while(e){t+=e.toString();e=e.next}return t+this.outro}isEmpty(){let t=this.firstChunk;do{if(t.intro.length&&t.intro.trim()||t.content.length&&t.content.trim()||t.outro.length&&t.outro.trim())return false}while(t=t.next);return true}length(){let t=this.firstChunk;let e=0;do{e+=t.intro.length+t.content.length+t.outro.length}while(t=t.next);return e}trimLines(){return this.trim("[\\r\\n]")}trim(t){return this.trimStart(t).trimEnd(t)}trimEndAborted(t){const e=new RegExp((t||"\\s")+"+$");this.outro=this.outro.replace(e,"");if(this.outro.length)return true;let n=this.lastChunk;do{const t=n.end;const i=n.trimEnd(e);if(n.end!==t){if(this.lastChunk===n){this.lastChunk=n.next}this.byEnd[n.end]=n;this.byStart[n.next.start]=n.next;this.byEnd[n.next.end]=n.next}if(i)return true;n=n.previous}while(n);return false}trimEnd(t){this.trimEndAborted(t);return this}trimStartAborted(t){const e=new RegExp("^"+(t||"\\s")+"+");this.intro=this.intro.replace(e,"");if(this.intro.length)return true;let n=this.firstChunk;do{const t=n.end;const i=n.trimStart(e);if(n.end!==t){if(n===this.lastChunk)this.lastChunk=n.next;this.byEnd[n.end]=n;this.byStart[n.next.start]=n.next;this.byEnd[n.next.end]=n.next}if(i)return true;n=n.next}while(n);return false}trimStart(t){this.trimStartAborted(t);return this}hasChanged(){return this.original!==this.toString()}_replaceRegexp(t,e){function getReplacement(t,n){if(typeof e==="string"){return e.replace(/\$(\$|&|\d+)/g,((e,n)=>{if(n==="$")return"$";if(n==="&")return t[0];const i=+n;if(i<t.length)return t[+n];return`$${n}`}))}else{return e(...t,t.index,n,t.groups)}}function matchAll(t,e){let n;const i=[];while(n=t.exec(e)){i.push(n)}return i}if(t.global){const e=matchAll(t,this.original);e.forEach((t=>{if(t.index!=null)this.overwrite(t.index,t.index+t[0].length,getReplacement(t,this.original))}))}else{const e=this.original.match(t);if(e&&e.index!=null)this.overwrite(e.index,e.index+e[0].length,getReplacement(e,this.original))}return this}_replaceString(t,e){const{original:n}=this;const i=n.indexOf(t);if(i!==-1){this.overwrite(i,i+t.length,e)}return this}replace(t,e){if(typeof t==="string"){return this._replaceString(t,e)}return this._replaceRegexp(t,e)}_replaceAllString(t,e){const{original:n}=this;const i=t.length;for(let r=n.indexOf(t);r!==-1;r=n.indexOf(t,r+i)){this.overwrite(r,r+i,e)}return this}replaceAll(t,e){if(typeof t==="string"){return this._replaceAllString(t,e)}if(!t.global){throw new TypeError("MagicString.prototype.replaceAll called with a non-global RegExp argument")}return this._replaceRegexp(t,e)}}const a=Object.prototype.hasOwnProperty;class Bundle{constructor(t={}){this.intro=t.intro||"";this.separator=t.separator!==undefined?t.separator:"\n";this.sources=[];this.uniqueSources=[];this.uniqueSourceIndexByFilename={}}addSource(t){if(t instanceof MagicString){return this.addSource({content:t,filename:t.filename,separator:this.separator})}if(!isObject(t)||!t.content){throw new Error("bundle.addSource() takes an object with a `content` property, which should be an instance of MagicString, and an optional `filename`")}["filename","indentExclusionRanges","separator"].forEach((e=>{if(!a.call(t,e))t[e]=t.content[e]}));if(t.separator===undefined){t.separator=this.separator}if(t.filename){if(!a.call(this.uniqueSourceIndexByFilename,t.filename)){this.uniqueSourceIndexByFilename[t.filename]=this.uniqueSources.length;this.uniqueSources.push({filename:t.filename,content:t.content.original})}else{const e=this.uniqueSources[this.uniqueSourceIndexByFilename[t.filename]];if(t.content.original!==e.content){throw new Error(`Illegal source: same filename (${t.filename}), different contents`)}}}this.sources.push(t);return this}append(t,e){this.addSource({content:new MagicString(t),separator:e&&e.separator||""});return this}clone(){const t=new Bundle({intro:this.intro,separator:this.separator});this.sources.forEach((e=>{t.addSource({filename:e.filename,content:e.content.clone(),separator:e.separator})}));return t}generateDecodedMap(t={}){const e=[];this.sources.forEach((t=>{Object.keys(t.content.storedNames).forEach((t=>{if(!~e.indexOf(t))e.push(t)}))}));const n=new Mappings(t.hires);if(this.intro){n.advance(this.intro)}this.sources.forEach(((t,i)=>{if(i>0){n.advance(this.separator)}const r=t.filename?this.uniqueSourceIndexByFilename[t.filename]:-1;const s=t.content;const o=getLocator(s.original);if(s.intro){n.advance(s.intro)}s.firstChunk.eachNext((i=>{const h=o(i.start);if(i.intro.length)n.advance(i.intro);if(t.filename){if(i.edited){n.addEdit(r,i.content,h,i.storeName?e.indexOf(i.original):-1)}else{n.addUneditedChunk(r,i,s.original,h,s.sourcemapLocations)}}else{n.advance(i.content)}if(i.outro.length)n.advance(i.outro)}));if(s.outro){n.advance(s.outro)}}));return{file:t.file?t.file.split(/[/\\]/).pop():null,sources:this.uniqueSources.map((e=>t.file?getRelativePath(t.file,e.filename):e.filename)),sourcesContent:this.uniqueSources.map((e=>t.includeContent?e.content:null)),names:e,mappings:n.raw}}generateMap(t){return new SourceMap(this.generateDecodedMap(t))}getIndentString(){const t={};this.sources.forEach((e=>{const n=e.content._getRawIndentString();if(n===null)return;if(!t[n])t[n]=0;t[n]+=1}));return Object.keys(t).sort(((e,n)=>t[e]-t[n]))[0]||"\t"}indent(t){if(!arguments.length){t=this.getIndentString()}if(t==="")return this;let e=!this.intro||this.intro.slice(-1)==="\n";this.sources.forEach(((n,i)=>{const r=n.separator!==undefined?n.separator:this.separator;const s=e||i>0&&/\r?\n$/.test(r);n.content.indent(t,{exclude:n.indentExclusionRanges,indentStart:s});e=n.content.lastChar()==="\n"}));if(this.intro){this.intro=t+this.intro.replace(/^[^\n]/gm,((e,n)=>n>0?t+e:e))}return this}prepend(t){this.intro=t+this.intro;return this}toString(){const t=this.sources.map(((t,e)=>{const n=t.separator!==undefined?t.separator:this.separator;const i=(e>0?n:"")+t.content.toString();return i})).join("");return this.intro+t}isEmpty(){if(this.intro.length&&this.intro.trim())return false;if(this.sources.some((t=>!t.content.isEmpty())))return false;return true}length(){return this.sources.reduce(((t,e)=>t+e.content.length()),this.intro.length)}trimLines(){return this.trim("[\\r\\n]")}trim(t){return this.trimStart(t).trimEnd(t)}trimStart(t){const e=new RegExp("^"+(t||"\\s")+"+");this.intro=this.intro.replace(e,"");if(!this.intro){let e;let n=0;do{e=this.sources[n++];if(!e){break}}while(!e.content.trimStartAborted(t))}return this}trimEnd(t){const e=new RegExp((t||"\\s")+"+$");let n;let i=this.sources.length-1;do{n=this.sources[i--];if(!n){this.intro=this.intro.replace(e,"");break}}while(!n.content.trimEndAborted(t));return this}}MagicString.Bundle=Bundle;MagicString.SourceMap=SourceMap;MagicString.default=MagicString;t.exports=MagicString}};var e={};function __nccwpck_require__(n){var i=e[n];if(i!==undefined){return i.exports}var r=e[n]={exports:{}};var s=true;try{t[n].call(r.exports,r,r.exports,__nccwpck_require__);s=false}finally{if(s)delete e[n]}return r.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var n=__nccwpck_require__(712);module.exports=n})();