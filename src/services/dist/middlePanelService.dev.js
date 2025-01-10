"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _jwtDecode = require("jwt-decode");

var _authService = _interopRequireDefault(require("./authService"));

var _stringConstants = require("../_utils_/stringConstants");

var _createTransitions = require("@mui/material/styles/createTransitions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var API_URL = _stringConstants.DEV_API_URL;

var axiosInstance = _axios["default"].create({
  baseURL: API_URL
}); // Add the Authorization header for every request


axiosInstance.interceptors.request.use(function (config) {
  var token = _authService["default"].getToken();

  if (token) {
    console.log(config);
    config.headers['Authorization'] = "Bearer ".concat(token); // Add token to the headers
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});

var createNewRoom = function createNewRoom(roomDetails) {
  var response;
  return regeneratorRuntime.async(function createNewRoom$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(API_URL, "rooms/create/"), roomDetails));

        case 3:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          throw _context.t0.response.data;

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var getUserRooms = function getUserRooms(user_id) {
  var response;
  return regeneratorRuntime.async(function getUserRooms$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(API_URL, "user/rooms"), {
            params: {
              user_id: user_id
            }
          }));

        case 3:
          response = _context2.sent;
          console.log(response.data);
          return _context2.abrupt("return", response.data);

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          throw _context2.t0.response.data;

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var _default = {
  createNewRoom: createNewRoom,
  getUserRooms: getUserRooms
};
exports["default"] = _default;