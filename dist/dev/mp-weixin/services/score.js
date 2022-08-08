"use strict";
var common_vendor = require("../common/vendor.js");
const getStorageAsync = function(key) {
  return new Promise((resolve, reject) => {
    common_vendor.index.getStorage({
      key,
      success(result) {
        resolve(result.data);
      },
      fail(reason) {
        resolve([]);
      }
    });
  });
};
const getScore = function(subject) {
  return getStorageAsync(subject).then((res) => {
    const topics = (res || []).map((x, y) => {
      return {
        index: y,
        error: x && x[0] || 0,
        success: x && x[1] || 0
      };
    });
    return {
      name: subject,
      topics
    };
  });
};
const saveScore = function(subject) {
  const topics = subject.topics.map((x) => {
    return [x.error, x.success];
  });
  return new Promise((resolve, reject) => {
    common_vendor.index.setStorage({
      key: subject.name,
      data: topics,
      success: function(res) {
        resolve(res);
      },
      fail: function(err) {
        reject(err);
      }
    });
  });
};
const fetchSubject = function(url) {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url,
      success: (res) => {
        const arr = res.data.questions;
        res.data.questions.forEach((x, i) => {
          x.id = i;
        });
        resolve(arr);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};
const fetchSubjectRandom = async function(option) {
  const qs = await fetchSubject(option.url);
  const scors = await getScore(option.name);
  let totalWeight = 0;
  const weights = qs.map((x, y) => {
    const weight = scors.topics[y] ? 10 + scors.topics[y].error * 3 - scors.topics[y].success : 10;
    totalWeight += weight;
    return weight;
  });
  let start = 0;
  let top = option.top || qs.length;
  if (top > qs.length)
    top = qs.length;
  const result = [];
  while (top > 0) {
    let remain = Math.random() * totalWeight;
    let pos = qs.length - 1;
    for (let i = start; i < qs.length; i++) {
      remain -= weights[i];
      if (remain <= 0) {
        pos = i;
        break;
      }
    }
    weights[start];
    weights[start] = weights[pos];
    weights[pos] = weights[start];
    start++;
    totalWeight -= weights[start];
    result.push(pos);
    top--;
  }
  console.log("\u751F\u6210\u9898\u76EE", { weights, result });
  return result.map((x) => qs[x]);
};
const updateSujectScores = function(subject, topis) {
  return getScore(subject).then((s) => {
    topis.forEach((t) => {
      const item = s.topics[t.index] || (s.topics[t.index] = { index: t.index, error: 0, success: 0 });
      if (t.success)
        item.success++;
      else
        item.error++;
    });
    return saveScore(s);
  });
};
exports.fetchSubjectRandom = fetchSubjectRandom;
exports.updateSujectScores = updateSujectScores;
