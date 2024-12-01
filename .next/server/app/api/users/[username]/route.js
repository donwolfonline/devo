/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/users/[username]/route";
exports.ids = ["app/api/users/[username]/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fusers%2F%5Busername%5D%2Froute&page=%2Fapi%2Fusers%2F%5Busername%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fusers%2F%5Busername%5D%2Froute.ts&appDir=%2FUsers%2Ffrederickdineen%2FDesktop%2Fdevoapp%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Ffrederickdineen%2FDesktop%2Fdevoapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fusers%2F%5Busername%5D%2Froute&page=%2Fapi%2Fusers%2F%5Busername%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fusers%2F%5Busername%5D%2Froute.ts&appDir=%2FUsers%2Ffrederickdineen%2FDesktop%2Fdevoapp%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Ffrederickdineen%2FDesktop%2Fdevoapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_frederickdineen_Desktop_devoapp_src_app_api_users_username_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/users/[username]/route.ts */ \"(rsc)/./src/app/api/users/[username]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/users/[username]/route\",\n        pathname: \"/api/users/[username]\",\n        filename: \"route\",\n        bundlePath: \"app/api/users/[username]/route\"\n    },\n    resolvedPagePath: \"/Users/frederickdineen/Desktop/devoapp/src/app/api/users/[username]/route.ts\",\n    nextConfigOutput,\n    userland: _Users_frederickdineen_Desktop_devoapp_src_app_api_users_username_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ1c2VycyUyRiU1QnVzZXJuYW1lJTVEJTJGcm91dGUmcGFnZT0lMkZhcGklMkZ1c2VycyUyRiU1QnVzZXJuYW1lJTVEJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGdXNlcnMlMkYlNUJ1c2VybmFtZSU1RCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmZyZWRlcmlja2RpbmVlbiUyRkRlc2t0b3AlMkZkZXZvYXBwJTJGc3JjJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmZyZWRlcmlja2RpbmVlbiUyRkRlc2t0b3AlMkZkZXZvYXBwJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUM0QjtBQUN6RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2ZyZWRlcmlja2RpbmVlbi9EZXNrdG9wL2Rldm9hcHAvc3JjL2FwcC9hcGkvdXNlcnMvW3VzZXJuYW1lXS9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvdXNlcnMvW3VzZXJuYW1lXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3VzZXJzL1t1c2VybmFtZV1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3VzZXJzL1t1c2VybmFtZV0vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvZnJlZGVyaWNrZGluZWVuL0Rlc2t0b3AvZGV2b2FwcC9zcmMvYXBwL2FwaS91c2Vycy9bdXNlcm5hbWVdL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fusers%2F%5Busername%5D%2Froute&page=%2Fapi%2Fusers%2F%5Busername%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fusers%2F%5Busername%5D%2Froute.ts&appDir=%2FUsers%2Ffrederickdineen%2FDesktop%2Fdevoapp%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Ffrederickdineen%2FDesktop%2Fdevoapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./src/app/api/users/[username]/route.ts":
/*!***********************************************!*\
  !*** ./src/app/api/users/[username]/route.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.ts\");\n\n\nasync function GET(request, { params }) {\n    try {\n        const username = params.username;\n        // Remove the @ symbol if present\n        const cleanUsername = username.replace('@', '');\n        const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].user.findFirst({\n            where: {\n                OR: [\n                    {\n                        username: cleanUsername\n                    },\n                    {\n                        email: cleanUsername\n                    }\n                ]\n            },\n            select: {\n                id: true,\n                name: true,\n                image: true,\n                username: true,\n                bio: true,\n                location: true,\n                company: true,\n                website: true,\n                github: true,\n                linkedin: true,\n                twitter: true,\n                projects: {\n                    where: {\n                        featured: true\n                    },\n                    select: {\n                        id: true,\n                        title: true,\n                        description: true,\n                        imageUrl: true,\n                        demoUrl: true,\n                        githubUrl: true,\n                        technologies: true,\n                        featured: true\n                    },\n                    orderBy: {\n                        createdAt: 'desc'\n                    }\n                },\n                portfolioStats: {\n                    select: {\n                        portfolioViews: true,\n                        profileVisits: true\n                    }\n                }\n            }\n        });\n        if (!user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'User not found'\n            }, {\n                status: 404\n            });\n        }\n        // Create or update portfolio stats\n        const stats = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].portfolioStats.upsert({\n            where: {\n                userId: user.id\n            },\n            create: {\n                userId: user.id,\n                portfolioViews: 1,\n                profileVisits: 1\n            },\n            update: {\n                profileVisits: {\n                    increment: 1\n                }\n            }\n        });\n        // Return user data with updated stats\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            ...user,\n            portfolioStats: stats\n        });\n    } catch (error) {\n        console.error('Error fetching user:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to fetch user'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS91c2Vycy9bdXNlcm5hbWVdL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUEyQztBQUNUO0FBRTNCLGVBQWVFLElBQ3BCQyxPQUFnQixFQUNoQixFQUFFQyxNQUFNLEVBQW9DO0lBRTVDLElBQUk7UUFDRixNQUFNQyxXQUFXRCxPQUFPQyxRQUFRO1FBRWhDLGlDQUFpQztRQUNqQyxNQUFNQyxnQkFBZ0JELFNBQVNFLE9BQU8sQ0FBQyxLQUFLO1FBRTVDLE1BQU1DLE9BQU8sTUFBTVAsbURBQU1BLENBQUNPLElBQUksQ0FBQ0MsU0FBUyxDQUFDO1lBQ3ZDQyxPQUFPO2dCQUNMQyxJQUFJO29CQUNGO3dCQUFFTixVQUFVQztvQkFBYztvQkFDMUI7d0JBQUVNLE9BQU9OO29CQUFjO2lCQUN4QjtZQUNIO1lBQ0FPLFFBQVE7Z0JBQ05DLElBQUk7Z0JBQ0pDLE1BQU07Z0JBQ05DLE9BQU87Z0JBQ1BYLFVBQVU7Z0JBQ1ZZLEtBQUs7Z0JBQ0xDLFVBQVU7Z0JBQ1ZDLFNBQVM7Z0JBQ1RDLFNBQVM7Z0JBQ1RDLFFBQVE7Z0JBQ1JDLFVBQVU7Z0JBQ1ZDLFNBQVM7Z0JBQ1RDLFVBQVU7b0JBQ1JkLE9BQU87d0JBQ0xlLFVBQVU7b0JBQ1o7b0JBQ0FaLFFBQVE7d0JBQ05DLElBQUk7d0JBQ0pZLE9BQU87d0JBQ1BDLGFBQWE7d0JBQ2JDLFVBQVU7d0JBQ1ZDLFNBQVM7d0JBQ1RDLFdBQVc7d0JBQ1hDLGNBQWM7d0JBQ2ROLFVBQVU7b0JBQ1o7b0JBQ0FPLFNBQVM7d0JBQ1BDLFdBQVc7b0JBQ2I7Z0JBQ0Y7Z0JBQ0FDLGdCQUFnQjtvQkFDZHJCLFFBQVE7d0JBQ05zQixnQkFBZ0I7d0JBQ2hCQyxlQUFlO29CQUNqQjtnQkFDRjtZQUNGO1FBQ0Y7UUFFQSxJQUFJLENBQUM1QixNQUFNO1lBQ1QsT0FBT1IscURBQVlBLENBQUNxQyxJQUFJLENBQ3RCO2dCQUFFQyxPQUFPO1lBQWlCLEdBQzFCO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxtQ0FBbUM7UUFDbkMsTUFBTUMsUUFBUSxNQUFNdkMsbURBQU1BLENBQUNpQyxjQUFjLENBQUNPLE1BQU0sQ0FBQztZQUMvQy9CLE9BQU87Z0JBQ0xnQyxRQUFRbEMsS0FBS00sRUFBRTtZQUNqQjtZQUNBNkIsUUFBUTtnQkFDTkQsUUFBUWxDLEtBQUtNLEVBQUU7Z0JBQ2ZxQixnQkFBZ0I7Z0JBQ2hCQyxlQUFlO1lBQ2pCO1lBQ0FRLFFBQVE7Z0JBQ05SLGVBQWU7b0JBQ2JTLFdBQVc7Z0JBQ2I7WUFDRjtRQUNGO1FBRUEsc0NBQXNDO1FBQ3RDLE9BQU83QyxxREFBWUEsQ0FBQ3FDLElBQUksQ0FBQztZQUN2QixHQUFHN0IsSUFBSTtZQUNQMEIsZ0JBQWdCTTtRQUNsQjtJQUNGLEVBQUUsT0FBT0YsT0FBTztRQUNkUSxRQUFRUixLQUFLLENBQUMsd0JBQXdCQTtRQUN0QyxPQUFPdEMscURBQVlBLENBQUNxQyxJQUFJLENBQ3RCO1lBQUVDLE9BQU87UUFBdUIsR0FDaEM7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmVkZXJpY2tkaW5lZW4vRGVza3RvcC9kZXZvYXBwL3NyYy9hcHAvYXBpL3VzZXJzL1t1c2VybmFtZV0vcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IHByaXNtYSBmcm9tICdAL2xpYi9wcmlzbWEnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKFxuICByZXF1ZXN0OiBSZXF1ZXN0LFxuICB7IHBhcmFtcyB9OiB7IHBhcmFtczogeyB1c2VybmFtZTogc3RyaW5nIH0gfVxuKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgdXNlcm5hbWUgPSBwYXJhbXMudXNlcm5hbWU7XG4gICAgXG4gICAgLy8gUmVtb3ZlIHRoZSBAIHN5bWJvbCBpZiBwcmVzZW50XG4gICAgY29uc3QgY2xlYW5Vc2VybmFtZSA9IHVzZXJuYW1lLnJlcGxhY2UoJ0AnLCAnJyk7XG5cbiAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZEZpcnN0KHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIE9SOiBbXG4gICAgICAgICAgeyB1c2VybmFtZTogY2xlYW5Vc2VybmFtZSB9LFxuICAgICAgICAgIHsgZW1haWw6IGNsZWFuVXNlcm5hbWUgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgc2VsZWN0OiB7XG4gICAgICAgIGlkOiB0cnVlLFxuICAgICAgICBuYW1lOiB0cnVlLFxuICAgICAgICBpbWFnZTogdHJ1ZSxcbiAgICAgICAgdXNlcm5hbWU6IHRydWUsXG4gICAgICAgIGJpbzogdHJ1ZSxcbiAgICAgICAgbG9jYXRpb246IHRydWUsXG4gICAgICAgIGNvbXBhbnk6IHRydWUsXG4gICAgICAgIHdlYnNpdGU6IHRydWUsXG4gICAgICAgIGdpdGh1YjogdHJ1ZSxcbiAgICAgICAgbGlua2VkaW46IHRydWUsXG4gICAgICAgIHR3aXR0ZXI6IHRydWUsXG4gICAgICAgIHByb2plY3RzOiB7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIGZlYXR1cmVkOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgICAgIHRpdGxlOiB0cnVlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHRydWUsXG4gICAgICAgICAgICBpbWFnZVVybDogdHJ1ZSxcbiAgICAgICAgICAgIGRlbW9Vcmw6IHRydWUsXG4gICAgICAgICAgICBnaXRodWJVcmw6IHRydWUsXG4gICAgICAgICAgICB0ZWNobm9sb2dpZXM6IHRydWUsXG4gICAgICAgICAgICBmZWF0dXJlZDogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgIGNyZWF0ZWRBdDogJ2Rlc2MnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHBvcnRmb2xpb1N0YXRzOiB7XG4gICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICBwb3J0Zm9saW9WaWV3czogdHJ1ZSxcbiAgICAgICAgICAgIHByb2ZpbGVWaXNpdHM6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogJ1VzZXIgbm90IGZvdW5kJyB9LFxuICAgICAgICB7IHN0YXR1czogNDA0IH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIG9yIHVwZGF0ZSBwb3J0Zm9saW8gc3RhdHNcbiAgICBjb25zdCBzdGF0cyA9IGF3YWl0IHByaXNtYS5wb3J0Zm9saW9TdGF0cy51cHNlcnQoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgdXNlcklkOiB1c2VyLmlkLFxuICAgICAgfSxcbiAgICAgIGNyZWF0ZToge1xuICAgICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgICAgIHBvcnRmb2xpb1ZpZXdzOiAxLFxuICAgICAgICBwcm9maWxlVmlzaXRzOiAxLFxuICAgICAgfSxcbiAgICAgIHVwZGF0ZToge1xuICAgICAgICBwcm9maWxlVmlzaXRzOiB7XG4gICAgICAgICAgaW5jcmVtZW50OiAxLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIC8vIFJldHVybiB1c2VyIGRhdGEgd2l0aCB1cGRhdGVkIHN0YXRzXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbiAgICAgIC4uLnVzZXIsXG4gICAgICBwb3J0Zm9saW9TdGF0czogc3RhdHMsXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgdXNlcjonLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogJ0ZhaWxlZCB0byBmZXRjaCB1c2VyJyB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInByaXNtYSIsIkdFVCIsInJlcXVlc3QiLCJwYXJhbXMiLCJ1c2VybmFtZSIsImNsZWFuVXNlcm5hbWUiLCJyZXBsYWNlIiwidXNlciIsImZpbmRGaXJzdCIsIndoZXJlIiwiT1IiLCJlbWFpbCIsInNlbGVjdCIsImlkIiwibmFtZSIsImltYWdlIiwiYmlvIiwibG9jYXRpb24iLCJjb21wYW55Iiwid2Vic2l0ZSIsImdpdGh1YiIsImxpbmtlZGluIiwidHdpdHRlciIsInByb2plY3RzIiwiZmVhdHVyZWQiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwiaW1hZ2VVcmwiLCJkZW1vVXJsIiwiZ2l0aHViVXJsIiwidGVjaG5vbG9naWVzIiwib3JkZXJCeSIsImNyZWF0ZWRBdCIsInBvcnRmb2xpb1N0YXRzIiwicG9ydGZvbGlvVmlld3MiLCJwcm9maWxlVmlzaXRzIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwic3RhdHMiLCJ1cHNlcnQiLCJ1c2VySWQiLCJjcmVhdGUiLCJ1cGRhdGUiLCJpbmNyZW1lbnQiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/users/[username]/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/prisma.ts":
/*!***************************!*\
  !*** ./src/lib/prisma.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log:  true ? [\n        'query',\n        'error',\n        'warn'\n    ] : 0\n});\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3ByaXNtYS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBOEM7QUFFOUMsTUFBTUMsa0JBQWtCQztBQUlqQixNQUFNQyxTQUNYRixnQkFBZ0JFLE1BQU0sSUFDdEIsSUFBSUgsd0RBQVlBLENBQUM7SUFDZkksS0FBS0MsS0FBc0MsR0FBRztRQUFDO1FBQVM7UUFBUztLQUFPLEdBQUcsQ0FBUztBQUN0RixHQUFHO0FBRUwsSUFBSUEsSUFBcUMsRUFBRUosZ0JBQWdCRSxNQUFNLEdBQUdBIiwic291cmNlcyI6WyIvVXNlcnMvZnJlZGVyaWNrZGluZWVuL0Rlc2t0b3AvZGV2b2FwcC9zcmMvbGliL3ByaXNtYS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XG5cbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbFRoaXMgYXMgdW5rbm93biBhcyB7XG4gIHByaXNtYTogUHJpc21hQ2xpZW50IHwgdW5kZWZpbmVkO1xufTtcblxuZXhwb3J0IGNvbnN0IHByaXNtYSA9XG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPz9cbiAgbmV3IFByaXNtYUNsaWVudCh7XG4gICAgbG9nOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JyA/IFsncXVlcnknLCAnZXJyb3InLCAnd2FybiddIDogWydlcnJvciddLFxuICB9KTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBwcmlzbWE7XG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYSIsImxvZyIsInByb2Nlc3MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fusers%2F%5Busername%5D%2Froute&page=%2Fapi%2Fusers%2F%5Busername%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fusers%2F%5Busername%5D%2Froute.ts&appDir=%2FUsers%2Ffrederickdineen%2FDesktop%2Fdevoapp%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Ffrederickdineen%2FDesktop%2Fdevoapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();