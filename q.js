var 
Q=function(W,D,M,body,laHash,lash,L,LL,index,popstate,VS,Regex,key,Q){
	body=D.getElementsByTagName('body')[0];
	laHash='`';
	Regex=[];
	key='!';
	popstate=function(){
		if(laHash==location.hash)
			return;

		Q.lash=lash=location.hash.substring(key.length+1);

		L=lash.split('/');

		var 
		i=Regex.length;
		while(i--)if(LL=lash.match(Regex[i][0])){
			LL[0]=Regex[i][1];
			L=LL;
			break;
		}
		
		if(!Q[L[0]]){
			location.hash='#'+key+index;
			Q.lash=index;
			return;
		}

		body.className='body-'+L[0];

		if(Q.pop)
			Q.pop.apply(W,L);

		laHash=location.hash;

		Q[L.shift()].apply(W,L);
	};
	Q={
		lash:'',
		init:function(o){

			if(o.key!==undefined)
				key=o.key;

			index=o.index||'V';

			if(o.pop&&typeof o.pop=='function')
				Q.pop=o.pop;

			popstate();

			'onhashchange' in W?W.onhashchange=popstate:setInterval(function(){
				if(laHash!=location.hash){
					popstate();
					laHash=location.hash;
				}
			},100);

			return this
		},
		reg:function(r,u){
			//稍微修改了下函数，现在能使用数组来注册了
			if(!r)
				return;

			if(u == undefined)
				u=function(){};

			if(r instanceof RegExp){
				if(typeof u=='function'){
					var fn='A'+(('8'+Math.random()).substring(3)*1).toString(16);
					Q[fn]=u;
					u=fn;
				}
				Regex.push([r,u]);
			}else if(r instanceof Array){
				for(var i in r){
					L=[].concat(r[i]).concat(u);
					this.reg.apply(this,L);
				}
			}else if (typeof r == 'string') {
				if(typeof u=='function'){
					Q[r]=u;
				}else if(typeof u=='string' && Q[u]){
					Q[r]=Q[u];
				}
			};
			return this
		},
		V:function(){
			console.log('Q.js 请设置框架默认页面');
			console.log('Q.js @卜卜口<http://i.mouto.org> 2014/12/28');
			/*这行注释的意义在于，愿看到代码时能保留上面一行 OAQ */
			return this
		},
		go:function(u){
			location.hash='#'+key+u;
			return this
		}
	};
	return Q;
}(this,document);