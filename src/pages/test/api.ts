 
export interface QuestionAnswerSheet{
    name:string
    value:string
}

export interface Question{
    /**
     * 类型，1:选择题，2：判断题，3：填空题
     *
     * @type {number}
     * @memberof Question
     */
     id:string|number
     type: 1|2|3
     title:string
     answer:string
     answerSheet:Array<QuestionAnswerSheet>
     answerDoubt:string

}
export interface TestingQuestion extends Question{
    filled?:boolean
    answerResult?:string
    answerCorrect?:boolean
}
export function fetchQuestions(type:number){
    let n = 100;
    let arr = new Array<TestingQuestion>()
    while(n-->0){
        arr.push({
            title:'这是第{}题,答案是{}',
            type:3,
            answer:( 101-n)+'',
            answerSheet:[],
            answerDoubt:'',
            filled:false,
            
        })
    }
    return Promise.resolve(arr);
}