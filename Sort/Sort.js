/*
 * @Author: Cryptic 
 * @Date: 2017-10-22 08:38:07 
 * @Last Modified by: Oyxiaoxi
 * @Last Modified time: 2017-10-22 09:08:48
 */

// 原始数据 
var dataStore = [72, 1, 68, 95, 75, 54, 58, 10, 35, 6, 28, 45, 69, 13, 88, 99, 24, 28, 30, 31, 78, 2, 77, 82, 72];

/**
 * 冒泡排序 BubbleSort
 * 1.比较相邻的元素。如果第一个比第二个大，就交换它们两个；
 * 2.对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样最终最大数被交换到最后的位置
 * 3.对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样最终最大数被交换到最后的位置
 * 4.重复步骤1~3，直到排序完成
 */

function bubbleSort(data) {
    var temp = 0;
    for (var i = data.length; i > 0; i--) {
        for (var j = 0; j < i - 1; j++) {
            if (data[j] > data[j - 1]) {
                temp = data[j];
                data[j] = data[j + 1];
                data[j + 1] = temp;
            }
        }
    }
    return data;
}


console.log('原始数据:' + dataStore);
console.log('冒泡排序:' + bubbleSort(dataStore));


/**
 * 选择排序 SelctionSort
 * 从数组的开头开始遍历，将第一个元素和其他元素分别进行比较，记录最小的元素，等循环结束之后，将最小的元素放到数组的第一个位置上，然后从数组的第二个位置开始继续执行上述步骤。当进行到数组倒数第二个位置的时候，所有的数据就完成了排序。
 */

function selectionSort(data) {
    for (var i = 0; i < data.length; i++) {
        var min = data[i];
        var temp, index = 1;
        for (var j = i + 1; j < data.length; j++) {
            if (data[j] < min) {
                min = data[j];
                index = j;
            }
        }
        temp = data[i];
        data[i] = min;
        data[index] = temp;
    }
    return data;
}

console.log('原始数据:' + dataStore);
console.log('选择排序:' + selectionSort(dataStore));


/**
 * 插入排序 insertionSort
 * 1.从第一个元素开始，该元素默认已经被排序
 * 2.取出下一个元素，在已经排序的元素序列中从后向前扫描
 * 3.如果该元素（已排序）大于新元素，将该元素移到下一位置
 * 4.重复步骤3，直到找到已排序的元素小于或者等于新元素的位置
 * 5.将新元素插入到该位置
 * 6.重复步骤2~5，直到排序完成
 */

function insertionSort(data) {
    var len = data.length;
    for (var i = 1; i < len; i++) {
        var key = data[i];
        var j = i - 1;
        while (j >= 0 && data[j] > key) {
            data[j + 1] = data[j];
            j--;
        }
        data[j + 1] = key;
    }
    return data;
}

console.log('原始数据:' + dataStore);
console.log('插入排序:' + insertionSort(dataStore));


/**
 * 高级排序算法
 * 希尔排序（Shell Sort）
 * 1.先将整个待排元素序列分割成若干个子序列（由相隔某个“增量”的元素组成的）分别进行直接插入排序
 * 2.依次缩减增量再进行排序，待整个序列中的元素基本有序（增量足够小）时，再对全体元素进行一次直接插入排序
 */


function shallSort(array) {
    var increment = array.length;
    var i
    var temp; // 暂存
    do {
        // 设置增量
        increment = Math.floor(increment / 3) + 1;
        for (i = increment; i < array.length; i++) {
            if (array[i] < array[i - increment]) {
                temp = array[i];
                for (var j = i - increment; j >= 0 && temp < array[j]; j -= increment) {
                    array[j + increment] = array[j];
                }
                array[j + increment] = temp;
            }
        }
    }
    while (increment > 1)

    return array;
}

console.log( '原始数据:' + dataStore );
console.log( '希尔排序:' + shallSort( dataStore) );

/**
 * 归并排序 Merge Sort
 * 1.把长度为n的输入序列分成两个长度为n/2的子序列；
 * 2.对这两个子序列分别采用归并排序；
 * 3.将两个排序好的子序列合并成一个最终的排序序列
 */

function mergeSort(array) {
    var len = array.length;
    if (len < 2) {
        return array;
    }
    var middle = Math.floor(len / 2),
        left = array.slice(0, middle),
        right = array.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    var result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    while (left.length)
        result.push(left.shift());
    while (right.length)
        result.push(right.shift());
    return result;
}

console.log( '原始数据:' + dataStore );
console.log( '归并排序:' + mergeSort( dataStore) );

/**
 * 快速排序 Quicksort
 * 1.通过递归方式将数据依次分解为包含较小元素和较大元素的不同子序列，会不断重复这个步骤，直到所有的序列全部为有序的，最后将这些子序列一次拼接起来，就可得到排序好的数据。
 * 2.该算法首先要从数列中选出一个元素作为基数（pivot）。接着所有的数据都将围绕这个基数进行，将小于改基数的元素放在它的左边，大于或等于它的数全部放在它的右边，对左右两个小数列重复上述步骤，直至各区间只有1个数。
 */

function quickSort( arr ){
    //console.time('quickSort')
    if ( arr.length == 0) {
        return [];
    }
    var left = [];
    var right = [];
    var pivot = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push( arr[i] );
        } else {
            right.push( arr[i] );
        }
    }
    console.timeEnd('quickSort');
    return quickSort( left ).concat( pivot, quickSort( right ));
}

console.log( '原始数据:' + dataStore );
console.log( '快速排序:' + quickSort( dataStore) );