import { Component, OnInit } from '@angular/core';
import { StorageProvider } from 'src/app/providers/storage/storage.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.page.html',
  styleUrls: ['./chatbot.page.scss'],
})
export class ChatbotPage implements OnInit {

  constructor(private keystore: StorageProvider) {  }

  loadReactComponent() {
    const script1 = document.createElement('script');
    script1.type = 'text/javascript';
    script1.innerText = `!function (e) { function t(t) { for (var n, a, i = t[0], l = t[1], f = t[2], p = 0, s = []; p < i.length; p++)a = i[p], Object.prototype.hasOwnProperty.call(o, a) && o[a] && s.push(o[a][0]), o[a] = 0; for (n in l) Object.prototype.hasOwnProperty.call(l, n) && (e[n] = l[n]); for (c && c(t); s.length;)s.shift()(); return u.push.apply(u, f || []), r() } function r() { for (var e, t = 0; t < u.length; t++) { for (var r = u[t], n = !0, i = 1; i < r.length; i++) { var l = r[i]; 0 !== o[l] && (n = !1) } n && (u.splice(t--, 1), e = a(a.s = r[0])) } return e } var n = {}, o = { 1: 0 }, u = []; function a(t) { if (n[t]) return n[t].exports; var r = n[t] = { i: t, l: !1, exports: {} }; return e[t].call(r.exports, r, r.exports, a), r.l = !0, r.exports } a.m = e, a.c = n, a.d = function (e, t, r) { a.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r }) }, a.r = function (e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, a.t = function (e, t) { if (1 & t && (e = a(e)), 8 & t) return e; if (4 & t && "object" == typeof e && e && e.__esModule) return e; var r = Object.create(null); if (a.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var n in e) a.d(r, n, function (t) { return e[t] }.bind(null, n)); return r }, a.n = function (e) { var t = e && e.__esModule ? function () { return e.default } : function () { return e }; return a.d(t, "a", t), t }, a.o = function (e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, a.p = "/"; var i = this.webpackJsonpai_chatbox = this.webpackJsonpai_chatbox || [], l = i.push.bind(i); i.push = t, i = i.slice(); for (var f = 0; f < i.length; f++)t(i[f]); var c = l; r() }([])`;
    document.getElementsByTagName("body")[0].appendChild(script1);

    const script2 = document.createElement('script');
    script2.type = 'text/javascript';
    script2.src = "/assets/build/static/js/2.3ec46d55.chunk.js";
    document.getElementsByTagName("body")[0].appendChild(script2);

    const script3 = document.createElement('script');
    script3.type = 'text/javascript';
    script3.src = "/assets/build/static/js/main.babd7181.chunk.js";
    document.getElementsByTagName("body")[0].appendChild(script3);

    // TODO
  
    this.keystore.get("user").then((user) => {
      Object.assign(window, {user: user});
      // const script4 = document.createElement('script');
      // script4.type = 'text/javascript';
      // script1.innerText = `ActionProvider.setUserId(${user.Id})`;
      // document.getElementsByTagName("body")[0].appendChild(script4);
    });

  }

  ngOnInit() {
    this.loadReactComponent();
  }

}
