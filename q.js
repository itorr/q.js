var 
Q=function(W,D,M,body,laHash,lash,L,LL,index,popstate,VS,NB,Regex,key,Q){
	NB='onhashchange' in W;
	body=D.getElementsByTagName('body')[0];
	laHash='`';
	Regex=[];
	key='!';
	popstate=function(){
		if(NB)W.onhashchange=popstate;
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

			if(!NB)
				setInterval(function(){
					if(laHash!=location.hash){
						popstate();
						laHash=location.hash;
					}
				},100);
		},
		reg:function(r,u){
			if(!r||!u)
				return;

			switch(typeof r){
				case 'object':
					if(typeof u=='function'){
						var fn='A'+(('8'+Math.random()).substring(3)*1).toString(16);
						Q[fn]=u;
						u=fn;
					}
					Regex.push([r,u]);
					break;
				case 'string':
					if(typeof u=='function'){
						Q[r]=u
					}else if(typeof u=='string' && Q[u]){
						Q[r]=Q[u]
					}
					break;
			}
		},
		V:function(){
			console.log('Q.js 请设置框架默认页面');
			console.log('Q.js @卜卜口<http://i.mouto.org> 2014/12/28');
			/*这行注释的意义在于，愿看到代码时能保留上面一行 OAQ */
		},
		go:function(u){
			location.hash='#'+key+u;
		}
	};
	return Q;
}(this,document);