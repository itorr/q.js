/*!
 * Q.js<https://github.com/itorr/q.js>
 * Version: 1.2
 * Built: 2014/12/28
 */
var 
Q=function(W,D,M,HTML,hash,view,arg,LL,i,index,Regex,key,Q){
	HTML=D.getElementsByTagName('html')[0];
	Regex=[];
	key='!';
	onhashchange=function(){
		Q.hash=hash=location.hash.substring(key.length+1);

		arg=hash.split('/');

		i=Regex.length;
		while(i--)
			if(LL=hash.match(Regex[i])){
				arg[0]=Regex[i];
				break;
			}

		if(!Q[arg[0]])
			arg[0]=index;
		
		if(Q.pop)
			Q.pop.apply(W,arg);

		Q.lash=view=arg.shift();

		HTML.setAttribute('view',view);

		Q[view].apply(W,arg);
	};
	Q={
		init:function(o){

			if(o.key!==undefined)
				key=o.key;

			index=o.index||'V';

			if(o.pop&&typeof o.pop=='function')
				Q.pop=o.pop;

			onhashchange();

			return this
		},
		reg:function(r,u){
			if(!r)
				return;

			if(u == undefined)
				u=function(){};

			if(r instanceof RegExp){
				Q[r]=u;
				Regex.push(r);
			}else if(r instanceof Array){//数组注册
				for(var i in r){
					L=[].concat(r[i]).concat(u);
					this.reg.apply(this,L);
				}
			}else if(typeof r=='string'){
				if(typeof u=='function')
					Q[r]=u;
				else if(typeof u=='string'&&Q[u])
					Q[r]=Q[u];
			}	
			
			return this
		},
		V:function(){
			console.log('Q.js <https://github.com/itorr/q.js> 2014/12/28');
			return this
		},
		go:function(u){
			location.hash='#'+key+u;
			return this
		}
	};
	return Q;
}(this,document);