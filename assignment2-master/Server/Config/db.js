"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Secret = exports.HostName = exports.RemoteURI = exports.LocalURI = void 0;
exports.LocalURI = "mongodb://localhost/contacts";
exports.RemoteURI = process.env.RemoteURI;
exports.HostName = (process.env.RemoteURI) ? "remotehost" : "localhost";
exports.Secret = "someSecret";
//# sourceMappingURL=db.js.map