function badChar(substr){
	let bc = new Array();
	for(let i = 0; i < substr.length; i++)
		bc[substr[i]] = i;
	return bc;
}
function goodChar(substr) {
	let m = substr.length;
	let gc = new Array(m + 1);
	for (let i = 0; i < gc.length; i++)
		gc[i] = 0;
	let f = new Array(m + 1);
	let j = m + 1;
	f[m] = j;
	for (let i = m; i > 0; i-- ) {
		while ( j <= m && substr[i - 1] != substr[j - 1] ) {
			if (gc[j] == 0) 
			gc[j] = j - i;
			j = f[j];
		}
		j--;
		f[i - 1] = j; 
	}
	let p = f[0]; 
	for ( j = 0; j <= m; j++ ) {
		if ( gc[j] == 0 ) 
		gc[j] = p; 
		if (j == p)
			p = f[p]; 
	}
	return gc;
}


let arg = process.argv;
let str = arg[2];//строка
let substr = arg[3];//искомая подстрока
let output = new Array();
let bc = badChar(substr);
let gc = goodChar(substr);
let m = substr.length;
let i = 0;
let j = 0;

//node B&M.js str substr

while (i <= str.length - m) {
	for (j = m - 1; j >= 0 && substr[j] == str[i + j]; j--);
	if (j < 0) {
		output.push(i+1);
		i += gc[j + 1];
	}
	else {
		i += Math.max( 
			gc[j + 1], 	//shift2
			( (bc[ str[i + j] ]) ? Math.max(j - bc[ str[i + j] ], 1) : j )  //shift1
		);
	}
}
console.log('Совпадения с позиций',output);