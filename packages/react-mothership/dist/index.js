import _objectWithoutProperties from '@babel/runtime/helpers/esm/objectWithoutProperties';
import React, { createContext, useContext, useMemo, Children, useEffect, memo, createElement, Suspense, Component } from 'react';
import { Router, Redirect as Redirect$1, Route, withRouter, Switch } from 'react-router';
export { Route, Switch, withRouter } from 'react-router';
import { connect, useStore, useSelector, ReactReduxContext, Provider as Provider$1 } from 'react-redux';
export { connect, useDispatch, useSelector, useStore } from 'react-redux';
import _get from 'lodash/get';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _possibleConstructorReturn from '@babel/runtime/helpers/esm/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/esm/getPrototypeOf';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _wrapNativeSuper from '@babel/runtime/helpers/esm/wrapNativeSuper';
import _merge from 'lodash/merge';
import _trimStart from 'lodash/trimStart';
import _trimEnd from 'lodash/trimEnd';
import _mapValues from 'lodash/mapValues';
import _objectSpread from '@babel/runtime/helpers/esm/objectSpread';
import { createBrowserHistory } from 'history';
import { init } from '@rematch/core';
export { createModel } from '@rematch/core';
import selectPlugin from '@rematch/select';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _partition from 'lodash/partition';
import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray';
import { NavLink as NavLink$1, Link as Link$1 } from 'react-router-dom';

var context=createContext(null);var useApp=function useApp(){return useContext(context);};var Provider=context.Provider;

var NotProvidedInScopeError=function(_Error){_inherits(NotProvidedInScopeError,_Error);function NotProvidedInScopeError(path,scope){var _this;_classCallCheck(this,NotProvidedInScopeError);_this=_possibleConstructorReturn(this,_getPrototypeOf(NotProvidedInScopeError).call(this,"Path \"".concat(path,"\" not provided by feature \"").concat(scope,"\"")));_this.name='ViewNotFoundError';return _this;}return NotProvidedInScopeError;}(_wrapNativeSuper(Error));var context$1=createContext({name:'root',views:{},provides:{}});function useScope(){return useContext(context$1);}function useProvided(){var scope=useContext(context$1);for(var _len=arguments.length,deps=new Array(_len),_key=0;_key<_len;_key++){deps[_key]=arguments[_key];}return deps.map(function(path){var val=_get(scope.provides,path);if(val===undefined){throw new NotProvidedInScopeError(path,scope.name);}return val;});}

function pathJoin(){var slash='/';for(var _len=arguments.length,parts=new Array(_len),_key=0;_key<_len;_key++){parts[_key]=arguments[_key];}return parts.reduce(function(acc,p){return p===slash?acc:[_trimEnd(acc,slash),_trimStart(p,slash)].join(slash);});}function addLinks(dest,basePath,views){views.forEach(function(view){if(view.name){dest[view.name]={exact:view.exact,resolve:view.resolve?function(){return pathJoin(basePath,view.resolve.apply(view,arguments));}:function(){return pathJoin(basePath,view.path);}};}});}

function Scope(_ref){var basePath=_ref.basePath,hoist=_ref.hoist,children=_ref.children,rest=_objectWithoutProperties(_ref,["basePath","hoist","children"]);var parent=useScope();var views=useViews(basePath,hoist);var scope=_merge({views:views},parent,rest);useModels(hoist,scope);return React.createElement(context$1.Provider,{value:scope,children:children});}Scope.displayName='Scope';function useViews(basePath,hoisted){return useMemo(function(){var views={};Children.forEach(hoisted,function(child){var _child$type$featureCo,_child$type$featureCo2;var featureName=(_child$type$featureCo=child.type.featureConfig)===null||_child$type$featureCo===void 0?void 0:_child$type$featureCo.name;var featureViews=(_child$type$featureCo2=child.type.featureConfig)===null||_child$type$featureCo2===void 0?void 0:_child$type$featureCo2.views;var featurePath=pathJoin(basePath,child.props.path);if(featureName){addLinks(views,featurePath,[{name:featureName,exact:child.props.exact,path:'/'}]);}if(featureViews){addLinks(views,featurePath,featureViews);}});return views;},[basePath,hoisted]);}function useModels(hoisted,scope){var app=useApp();useMemo(function(){return Children.forEach(hoisted,function(child){var _child$type$featureCo3;var featureModels=(_child$type$featureCo3=child.type.featureConfig)===null||_child$type$featureCo3===void 0?void 0:_child$type$featureCo3.models;if(!featureModels){return;}app.registerModels(featureModels,scope);});},[app,hoisted]);}

var withStore=connect;var withDispatch=function withDispatch(_arg){return connect(null,_arg);};var useAppEffect=function useAppEffect(mapDispatch,watch){var store=useStore();useEffect(function(){mapDispatch(store.dispatch);},watch);};var useAppSelector=function useAppSelector(mapSelect,payload){var store=useStore();return useSelector(function(state){return mapSelect(store.select)(state,payload);});};var sconnect=function sconnect(mapSelect,mapDispatch){return function(Base){var c=memo(function(props){return React.createElement(ReactReduxContext.Consumer,null,function(store){var enhance=connect(store.select(mapSelect),mapDispatch);return createElement(enhance(Base),props);});});c.displayName="sconnect(".concat(Base.displayName||Base.name||'Component',")");return c;};};var withStoreSelection=sconnect;var $$=sconnect;var _$=withDispatch;

var preset = {plugins:[selectPlugin()]};

var createStore = (function(config){return init(_objectSpread({},preset,config));});

function enhance(model,inject){return _objectSpread({},model,{effects:typeof model.effects==='function'?function(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return model.effects.apply(model,args.concat([inject]));}:model.effects,selectors:typeof model.selectors==='function'?function(){for(var _len2=arguments.length,args=new Array(_len2),_key2=0;_key2<_len2;_key2++){args[_key2]=arguments[_key2];}return model.selectors.apply(model,args.concat([inject]));}:model.selectors});}function createApp(){var config=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var registeredModels={};var store=createStore(config.rematch);var select=store.select,dispatch=store.dispatch,getState=store.getState;var history=createBrowserHistory();var inject=_objectSpread({},config.inject,{select:select,dispatch:dispatch,getState:getState});function navigate(views){return _mapValues(views,function(v){return function(){return history.push(v.resolve.apply(v,arguments));};});}function registerModels(models,scope){models.forEach(function(model){if(registeredModels[model.name]!==model){var injected=_objectSpread({},inject,{navigator:navigate(scope.views)});registeredModels[model.name]=model;store.model(enhance(model,injected));}});}return {store:store,history:history,registerModels:registerModels,navigate:navigate};}

function Mothership(_ref){var _ref$app=_ref.app,app=_ref$app===void 0?createApp():_ref$app,children=_ref.children,rest=_objectWithoutProperties(_ref,["app","children"]);return React.createElement(Provider,{value:app},React.createElement(Provider$1,{store:app.store},React.createElement(Scope,{name:"root",basePath:"/",hoist:children,provides:rest},React.createElement(Router,{history:app.history},children))));}

var useNavigator=function useNavigator(){var app=useApp();var _useScope=useScope(),views=_useScope.views;return useMemo(function(){return app.navigate(views);},[app,views]);};

var Boundary=function(_Component){_inherits(Boundary,_Component);function Boundary(){var _getPrototypeOf2;var _this;_classCallCheck(this,Boundary);for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}_this=_possibleConstructorReturn(this,(_getPrototypeOf2=_getPrototypeOf(Boundary)).call.apply(_getPrototypeOf2,[this].concat(args)));_this.state={hasError:false};return _this;}_createClass(Boundary,[{key:"render",value:function render(){if(this.state.hasError){var _this$props=this.props,_this$props$recovery=_this$props.recovery,recovery=_this$props$recovery===void 0?React.createElement("div",null,"Error!"):_this$props$recovery,rest=_objectWithoutProperties(_this$props,["recovery"]);return recovery;}else{var _this$props2=this.props,_this$props2$fallback=_this$props2.fallback,fallback=_this$props2$fallback===void 0?React.createElement("div",null,"Loading..."):_this$props2$fallback,_rest=_objectWithoutProperties(_this$props2,["fallback"]);return React.createElement(Suspense,Object.assign({fallback:fallback},_rest));}}}]);return Boundary;}(Component);Boundary.getDerivedStateFromError=function(error){return {hasError:true};};

var _BaseLink,_BaseNavLink,_BaseRedirect;var ViewNotFoundError=function(_Error){_inherits(ViewNotFoundError,_Error);function ViewNotFoundError(view,scope){var _this;_classCallCheck(this,ViewNotFoundError);_this=_possibleConstructorReturn(this,_getPrototypeOf(ViewNotFoundError).call(this,"View \"".concat(view,"\" not provided by feature \"").concat(scope,"\"")));_this.name='ViewNotFoundError';return _this;}return ViewNotFoundError;}(_wrapNativeSuper(Error));var enhance$1=function enhance(Comp){return function(_ref){var view=_ref.view,params=_ref.params,rest=_objectWithoutProperties(_ref,["view","params"]);var scope=useScope();var _useMemo=useMemo(function(){if(view){var _scope$views;var config=scope===null||scope===void 0?void 0:(_scope$views=scope.views)===null||_scope$views===void 0?void 0:_scope$views[view];if(!config){throw new ViewNotFoundError(view,scope.name);}return [config.resolve(params),config.exact];}else{return [undefined,undefined];}},[scope,view,params]),_useMemo2=_slicedToArray(_useMemo,2),to=_useMemo2[0],exact=_useMemo2[1];return createElement(Comp,_objectSpread({to:to,exact:exact},rest));};};var Link=(_BaseLink=Link$1,enhance$1(_BaseLink));var NavLink=(_BaseNavLink=NavLink$1,enhance$1(_BaseNavLink));var Redirect=(_BaseRedirect=Redirect$1,enhance$1(_BaseRedirect));

function createRoutes(basePath,views){return views.map(function(_ref){var path=_ref.path,component=_ref.component,effect=_ref.effect,redirect=_ref.redirect,rest=_objectWithoutProperties(_ref,["path","component","effect","redirect"]);var url=pathJoin(basePath,path);var render=renderHooks(effect&&reduxHook(effect),redirect&&redirectHook(redirect));return React.createElement(Route,Object.assign({key:url,path:url,component:component||render},rest));});}function renderHooks(){for(var _len=arguments.length,hooks=new Array(_len),_key=0;_key<_len;_key++){hooks[_key]=arguments[_key];}var used=hooks.filter(Boolean);if(!used.length){return undefined;}return function(){return used.map(function(_it){return _it.call();});};}function reduxHook(effect){return function(){useAppEffect(effect,[]);return null;};}function redirectHook(payload){var view,params;if(typeof payload==='object'){var to=payload.to,rest=_objectWithoutProperties(payload,["to"]);view=to;params=rest;}else{view=payload;}return function(){return React.createElement(Redirect,{key:view,view:view,params:params});};}

function createFeature(){var config=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};return function(Base){var _ref,_Feature;var name=config.name||Base.displayName||Base.name;function Feature(props){var provides=props.provides,path=props.path,exact=props.exact,match=props.match,children=props.children;var basePath=pathJoin(match.path,path);var routes=useRoutes(name,basePath,config.views);var _usePartition=usePartition(children),_usePartition2=_slicedToArray(_usePartition,2),withPath=_usePartition2[0],nested=_usePartition2[1];var render=function render(){return React.createElement(Boundary,{fallback:config.placeholder,recovery:config.recovery},React.createElement(Scope,{name:name,basePath:basePath,provides:_objectSpread({},config.provides,provides),hoist:children},React.createElement(Base,props,React.createElement(Switch,null,routes,withPath),nested)));};return path?React.createElement(Route,{path:basePath,exact:exact,render:render}):render();}var Wrapper=(_ref=(_Feature=Feature,memo(_Feature)),withRouter(_ref));Wrapper.displayName="Feature(".concat(name||'Component',")");Wrapper.WrappedComponent=Base;Wrapper.featureConfig=_objectSpread({},config,{name:name});return Wrapper;};}function useRoutes(name,basePath){var views=arguments.length>2&&arguments[2]!==undefined?arguments[2]:[];return useMemo(function(){return createRoutes(basePath,views);},[basePath]);}function usePartition(children){return useMemo(function(){return _partition(Children.toArray(children),function(_it){return _it.props.path;});},[children]);}

export { $$, Boundary, Link, Mothership, NavLink, Redirect, Scope, ViewNotFoundError, _$, createApp, createFeature, createStore, sconnect, useApp, useAppEffect, useAppSelector, useNavigator, useProvided, useScope, withDispatch, withStore, withStoreSelection };
//# sourceMappingURL=index.js.map
