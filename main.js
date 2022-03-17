for(var i=5;i>0;i--){
    for(var j=0;j<i;j++)
     document.write('*')
     document.write('<br/>');
}

for(var i=1;i<=9;i++){
    for(var j =1;j<=i;j++){
        document.write('<span>'+j+'*'+i+'='+j*i + '</span>');
    }
    document.write('<br/>')
}

console.time('test');
outer:
for (var i = 0; i < 5; i++) {
    console.log('外层循环' + i);
    for (var j = 0; j < 5; j++) {
        break outer;
        console.log('内层循环' + j);
    }
}
console.timeEnd('test');

(function(){
    // alert('匿名函数');
})();

var obj = {
    name: 'test',
    age: 10
}

for (var i in obj) {
    console.log(i + ':' + obj[i]);
}

function MyClass() {

}

var mc = new MyClass();
var mc2= new MyClass();

MyClass.prototype.a = 123;



console.log(mc2.__proto__ == MyClass.prototype);
console.log(mc.a);

var a = [1,2,3,2,2,4,3]
for (var i = 0; i < a.length; i++) {
    for (var j = i + 1; j < a.length; j++) {
        if (a[j] == a[i]) {
            a.splice(j, 1);
            j--;
        }
    }
}
console.log(a);


var b = [1,2,3,2,2,4,3];
b.sort(function(a,b){
    return a - b
})
console.log(b);


var obj = {
    name: 'obj',
    sayName: function () {
        alert(this.name)
    }
}
var obj2={name:'obj2'}
function fun(a,b){
    console.log('a='+a+'; b='+b)
}
fun.apply(obj);
fun.call(obj2);
fun();

fun.call(obj,2,3)
console.log(obj);
fun.apply(obj,[1,2])




















