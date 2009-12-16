/**
 * Q.opacity Library
 * Copyright (c) 2009 Sokolov Innokenty
 */
if(!Q)var Q={};Q.opacity={set:function(e,o){if(!e)return;e.style.opacity=o;e.style.filter='alpha(opacity='+o*100+')';}}