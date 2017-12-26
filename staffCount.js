/*
   *    count个人围坐成一个圈，从某个人开始报数，报数到 num的自动退出，下一个人从1开始，继续报数。
   *    问最后留下的人是谁？一共报了多少次
   *   count:总人数
   *   n:数到几的跳出
   * */

//初始化人数为一个数组
function init(count) {
    let arr = [];
    if (isNaN(parseInt(count))) {
        return arr;
    }
    count = parseInt(count);
    for (var i = 1; i <= count; i++) {
        arr.push(i);
    }
    return arr;
}

//开始报数，count：总人数，num：数到的数字
function start(count, num) {
    //报数次数
    let times = 0;
    let staff = init(count);

    //如果人数小于报的数字大小，则扩充数组
    function appendArr(arr) {
        var len = arr.length;
        if (len < num) {
            if (num / len >= 2) {
                arr = arr.concat(arr);
                appendArr(arr);
            }
            var newArr1 = [];
            for (var i in arr) {
                newArr1.push(arr[i])
            }
            newArr1 = newArr1.splice(0, parseInt(num - len));
            arr = arr.concat(newArr1);
            return appendArr(arr)
        }
        return arr;
    }

    //数数，并输出剩余人组成的数组，及跳出人的次数
    function doCount(arr) {
        if (arr.length == 0) {
            console.log("没有人数数");
            return;
        }
        times++;
        console.log("第" + times + "次:", arr);
        if (arr.length == 1) {
            return arr[0];
        }
        arr = appendArr(arr);
        for (var i in arr) {
            if ((parseInt(i) + 1) % num == 0) {
                var arr1 = arr, arr2 = arr;
                var pop = arr[i];
                arr1 = arr1.splice(parseInt(i) + 1, arr1.length);
                arr2 = arr2.splice(0, parseInt(i));
                arr = arr1.concat(arr2);
                if (arr.indexOf(pop) >= 0) {
                    arr = arr.splice(arr.indexOf(pop), 1);
                }
                return doCount(arr)
            }
        }
    }

    console.log(doCount(staff));
}

//入口。
start('6', 3);