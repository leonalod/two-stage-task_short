const jsPsych = initJsPsych({
    on_finish: function()
    {
        //jsPsych.data.displayData("csv")

        // output data in the form of csv
        jsPsych.data.get().localSave("csv", "data.csv")
    }
});

// arrays storing images
let images = [
    "img/patterns_1.png", 
    "img/patterns_1_chosen.png", "img/patterns_2.png", "img/patterns_2_chosen.png", 
    "img/treasure_1.jpg","img/patterns_3.jpg",
    "img/patterns_4.jpg","img/patterns_5.jpg","img/patterns_6.jpg","img/patterns_3_chosen.jpg",
    "img/patterns_4_chosen.jpg","img/patterns_5_chosen.jpg","img/patterns_6_chosen.jpg",
    "img/practice_patterns_1.png","img/practice_patterns_2.png","img/practice_patterns_3.png",
    "img/practice_patterns_4.png","img/practice_patterns_5.png","img/practice_patterns_6.png",
    "img/practice_patterns_1_chosen.png","img/practice_patterns_2_chosen.png","img/practice_patterns_3_chosen.png",
    "img/practice_patterns_4_chosen.png","img/practice_patterns_5_chosen.png","img/practice_patterns_6_chosen.png",
    "img/inst_example1.png","img/inst_example2.png","img/inst_example3.png","img/inst_example4.png","img/inst_example5.png","img/inst_example6.png"
];

let stage1patterns = [
        "img/patterns_1.png", 
        "img/patterns_2.png", 
        "img/patterns_1_chosen.png", 
        "img/patterns_2_chosen.png"
    ];

let stage2patterns = [
    [
        "img/patterns_3.jpg",
        "img/patterns_4.jpg",
        "img/patterns_3_chosen.jpg",
        "img/patterns_4_chosen.jpg",
    ],
    [
        "img/patterns_5.jpg",
        "img/patterns_6.jpg",
        "img/patterns_5_chosen.jpg",
        "img/patterns_6_chosen.jpg",
    ]
]

let prac_stage1patterns = [
    "img/practice_patterns_1.png", 
    "img/practice_patterns_2.png", 
    "img/practice_patterns_1_chosen.png", 
    "img/practice_patterns_2_chosen.png"
];

let prac_stage2patterns = [
[
    "img/practice_patterns_3.png",
    "img/practice_patterns_4.png",
    "img/practice_patterns_3_chosen.png",
    "img/practice_patterns_4_chosen.png",
],
[
    "img/practice_patterns_5.png",
    "img/practice_patterns_6.png",
    "img/practice_patterns_5_chosen.png",
    "img/practice_patterns_6_chosen.png",
]
]

// merge arrays and load
const preload = {
    type: jsPsychPreload,
    images: images,
};

// functions
function gaussRandom() {
	var u = 2*Math.random()-1;
	var v = 2*Math.random()-1;
	var r = u*u + v*v;
	/*if outside interval [0,1] start over*/
	if(r == 0 || r > 1) return gaussRandom();

	var c = Math.sqrt(-2*Math.log(r)/r);
	return u*c;
};

function createMemberInNormalDistribution(mean,std_dev){
	return mean + (gaussRandom()*std_dev);
};

function shuffle(o){
	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

// texts for showing images and texts
const show_reward = "<p class='center_position'><img src='img/treasure_1.jpg'/></p>";
const show_punish = "<p class='center_position'><img src='img/nonreward.jpg'/></p>";
const show_plus_point = "<p class='point'>+ 10P!</p>";
const show_minus_point = "<p class='point'>- 10P!</p>";
const show_which = "<p class='sentence_above'> <br>パターンを選択してください（ＦまたはＪを押してください）<br><br></p>";
const count_plz1 = "<p class='sentence_above'><br>1秒後にパターンを選択してください（ＦまたはＪを押してください）<br><br></p>";
const count_plz2 = "<p class='sentence_above'> <br>2秒後にパターンを選択してください（ＦまたはＪを押してください）<br><br></p>";
const count_plz3 = "<p class='sentence_above'><br>3秒後にパターンを選択してください（ＦまたはＪを押してください）<br><br></p>";
const start_right = "<p class='sentence_above'>You have chosen the right pattern.<br>右のパターンを選びました。<br><br></p>";
const start_left = "<p class='sentence_above'>You have chosen the left pattern.<br>左のパターンを選びました。<br><br></p>";
const next_trial = "<div class='sentence_above'>Press SPACE KEY for the next trial<br>スペースキーで次のトライアルへ</div>";
const no_response =  "<p class='inst_text'>時間内に反応が得られませんでした。<br><br>"+
    "カウントダウンが終わり、指示があってから2秒以内にキーを押すようにしてください。最初の選択肢に戻ります。<p>"
const init_inst = "<p class='inst_text'>HOW?<br>LETS MOVE TO THE EXPERIMENT" +
    "<br>DRUING...<b>DIFFERENT</b>ので，注意してください。" +
    "<br>本番は4つのブロックに分かれています。<br>ブロック間で適宜休憩を取りながら進めてください。" +
    "<br><b>ブロックが変わっても，ロケットの行先が変わることはありません。</b>" +
    "<br>準備ができたら，スペースキーを押して始めてください。</p>";
const block_fin = "<p class='inst_text'> これでこのブロックは終了です。<br><br>" +
    "Feel free to have a short break. Press SPACE KEY to start when you're ready.<br>必要なだけ休憩を取り，準備ができたらスペースキーを押して次へ進んでください。<p>"
const exp_fin = "<p class='inst_text'>Thank you! Your participation is a valuable contribution to our research.<br>ありがとうございました! あなたの参加は、私たちの研究への貴重な貢献です。<br><br>Feel free to take a short break. Then you can start filling up the questionnaire.<br>休憩はご自由にお取りください。その後、質問紙にお答えください。<br><br>"+
    "You can access the questionnaire by right clicking <a href='https://forms.gle/z7VK5XGoyRqcpHeXA'>HERE</a> to open it in a new tab or use the link in the email.<br>質問紙は<a href='https://forms.gle/z7VK5XGoyRqcpHeXA'>こちら</a>をを右クリックして新しいタブを開くか、メールに記載されているリンクからアクセスできます。<br><br>Press SPACE key to submit your results.<br>スペースキーを押して、結果を送信してください。";


//instructions
var instructions_1a_text = function(){
	var instructions = ["<div align=center><p class='inst_text'>こんにちは、私たちの実験にようこそ!<br><br>以下の説明をよくお読みください。<br><br></div>",
	"<div align=center><p class='inst_text'><br>実験中、あなたは2つの異なるパターンの中から一連の選択をすることになります。<br>最初に水色のパターンが表示されます：<br><br><img style='margin:0 px auto;display:block;height:200px' src='img/inst_example1.png'/><br><div align=center><p class='inst_text'>You will need to choose one of patterns by pressing <font color ='#ff8000'><strong>F</strong> (pattern on the left)</font> or <font color = '#3399ff'><strong>J</strong> (pattern on the right)</font><br><font color ='#ff8000'><strong>Ｆ</strong>（左のパターン）</font>または<font color = '#3399ff'><strong> Ｊ</strong>（右のパターン）</font>を押して、どちらかのパターンを選択してください。<br><br></p>* Note that this is only the demonstration, so you cannot choose your patterns. You'll be able to try it in the practice trials soon.<br>*これはデモンストレーションですので、パターンを選ぶことはできません。練習用トライアルで試せるようになります。<br><br></div>", 
	"<div align=center><p class='inst_text'><br>選択後、もう一組の黄色のパターンが表示されます：<br><br><img style='margin:0px auto;display:block;height:200px' src='img/inst_example2.png'/><br>Again you will need to make your choice by pressing F or J.<br>ここでもＦまたはＪキーを押して、パターンを選んでください。<br><br></div>",
	"<div align=center><p class='inst_text'>T<br>すると、結果が表示されます。<br><br>この結果が表示されると、<strong>1ポイント獲得できます</strong>：<br><img style='margin:10px auto;display:block;height:150px' src='img/inst_example3.png'/><br><Strong>You will not get any points</Strong> if you see this result:<br>この結果が表示されると、<strong>ポイントを獲得することはできません</strong>：<br><img style='margin:10px auto;display:block;height:100px' src='img/inst_example4.png'/>Your goal is to <Strong>gain as many points as possible</Strong>.<br>あなたの目標は、できるだけ<strong>多くのポイントを獲得する</strong>ことです。<br><br>You will get a <strong>bonus payment</strong> based on the points you earn.<br>獲得したポイントに応じて、<strong>追加の謝礼（ボーナス）を受け取れます</strong>。<br><br></p></div>",
	"<div align=center><p class='inst_text'><br>では、キーボードで少し試してみて、実験の仕組みに慣れておきましょう。 <br><br> Remember, press <font color = '#ff8000'><Strong>F</Strong></font> to choose the <font color = '#ff8000'><Strong>LEFT pattern</Strong></font>, and press <font color = '#3399ff'><Strong>J</Strong></font> to choose the <font color = '#3399ff'><Strong>RIGHT pattern</Strong></font>.<br><font color = '#ff8000'><strong>Ｆキーで左のパターン</strong></font>、<font color = '#3399ff'><strong>Ｊキーで右のパターン</strong></font>を選択してください。 <br><br>After the result shows up, press <font color = 'red'><Strong>SPACE KEY</Strong></font> to go to the next trial.<br>結果が表示されたら、<strong><font color = 'red'>スペースキー</strong></font>を押して次のトライアルに進みます。<br><br></div>"];
	return instructions
};

var show_horror1 = {
    type: jsPsychInstructions,
    stimulus:show_reward
    trial_duration: 2000
};
var image_sliderTrial1 = {
    type: jsPsychHtmlSliderResponse,
    stimulus: `<div style="width:500px;">
        <p>How much horrible did you feel about previous image?</p>
       `,
    require_movement: true,
    labels: ['not horrible', 'extremely horrible']

}
;

var = var show_horror1_ = {
	type: jsPsychInstructions,
	pages: instructions_1b_text(),
	key_forward: "j",
	key_backward: "f",
	show_clickable_nav: true,
};

var instructions_1a_block = {
	type: jsPsychPreload,
	pages: instructions_1a_text(),
	key_forward: "j",
	key_backward: "f",
	show_clickable_nav: true,
};

var instructions_1b_text = function(){
	var instructions = ["<div align=center><p class='inst_text'>これで、実験の仕組みがわかったと思います。<br>できるだけ多くのポイントを獲得することが目標であることをお忘れですか？<br><br>実はそのための<Strong><font color = '#F4D03F'>ヒント</font></Strong>があるんです。<br><br></div>",
	"<div align=center><p class='inst_text'><br>報酬はランダムではありません。<br>ある特定の黄色のパターンを選ぶと、他のパターンよりも報酬につながる可能性が高くなります。<br><img style='margin:0 px auto;display:block;height:280px' src='img/inst_example5.png'/><div align=center><p class='inst_text'>そこに注目するとよいでしょう。<br></Strong></font>.<br>報酬を得るチャンスが大きい黄色いパターンは、常に同じであるとは限らないです。<br>実験中、<font color = '#D35400'><Strong>ゆっくりと変化していく</Strong></font>のです。<br><br></div>", 
	"<div align=center><p class='inst_text'>また、黄色いパターンはランダムに現れるわけではありません。ある黄色いパターンは、ある特定の水色のパターンと関連性が高いのです。<br><img style='margin:0 px auto;display:block;height:280px' src='img/inst_example6.png'/><div align=center><p class='inst_text'><br>ある水色パターンを選ぶと、特定の黄色パターンのペアにつながりやすく、もう一方の水色パターンを選ぶと、別の黄色パターンのペアにつながりやすくなります。<br><br>この関連付けは、<font color = '#D35400'><strong>実験中ずっと同じ</strong></font>ままです。<br><br></div>",
	"<div align=center><p class='inst_text'>水色のパターンは、ポイント獲得のチャンスが大きい黄色いパターンにつながりやすいと思うものを選べば良いのです。<br><br>ただし、「確率が高い」といっても、いつも同じペアになるわけではありません。<br><br></p></div>",
	"<div align=center><p class='inst_text'>これで、これらのヒントを頭に入れながら、またしばらく練習してみましょう。<br><br> <br><br></div>"];
	return instructions
}

var instructions_1b_block = {
	type: jsPsychInstructions,
	pages: instructions_1b_text(),
	key_forward: "j",
	key_backward: "f",
	show_clickable_nav: true,
};

var instructions_2_text = function(){
	var instructions_2 = ["<div align=center><p class='inst_text'>これで練習用トライアルはすべて終了です。<br><br></div>",
	"<div align=center><p class='inst_text'>目的は、<font color = '#3399ff'><strong>ポイントを獲得すること</Strong></font>を忘れないでください。r>そのことを念頭に置いてください。<br>もう一度、ヒントを確認しましょう。<br><br></div>",
    "<div align=justify>Hint #1:<br>ヒント#1:どの黄色のパターンがごほうびをもらえる確率が高いか、覚えておきましょう。<br><br>そのパターンからポイントがもらえる確率はゆっくり変化するので、報酬につながる確率が高いパターンは、近い将来、ポイントを獲得できる可能性が非常に高いのです。<br><br>Hint #2:<br>ヒント#2<br>欲しい黄色のパターンにつながりやすい水色のパターンを見つけて使用することで、より多くのポイントを得ることができます。</div><br><br>",
    "<div align=center><p class='inst_text'>実験は<font color = '#ff8000'><Strong>4つのブロック</Strong></font>に分かれています。ブロックが終了するとお知らせがあります。<br> <br>ブロック間で適宜休憩を取ってください。<br><br>全部で<font color = '#3399ff'><Strong>200の試行</font></strong>があり、30分ほどで終わります。<br><br><font size = '8'><Strong>Good luck!<br><br>がんばってください!</Strong></font><br><br></div>"];
	return instructions_2
};

var instructions_2_block = {
	type: jsPsychInstructions,
	pages: instructions_2_text(),
	key_forward: "j",
	key_backward: "f",
	show_clickable_nav: true,
	on_finish: function(data){
	}
};



// prepare variables needed for trials
let pattern_name; 
let pattern_name1;
let pattern_name2;
let pattern_file;
let pattern_file1;
let pattern_file2;
let left_pattern;
let right_pattern;
let chosen_key;
let RT_expired
let chosen_pattern;
let result;
let trial_n = 0;
let block_n = 0;
let trial_num = 50;
let block_num = 4;
let prac_trial_num = 30;
let pattern_deact_duration = 1000;
let long_reactiontime = 3000
let short_reactiontime = 1000
let expired_time = [0,3000]
let random_num1;
let random_num2;
let p_random_num;
let state1;
let state2;
let pattern_chosen_state1;
let prev_a_state1; // previous action at state 1
let stay; // 0=switch, 1=stay
let pattern_chosen_state2;
let ps;
let iti = 800;
let mid_dur;
var max = 0.75;
var min = 0.25;
var sd = 0.025;
var score = 0;
let r; // no reward = -1, reward = 1
let tran; // rare = -1, common = 1

if (Math.random() > .5) {
	if(Math.random() > .5) {
		ps = [0.6, 0.4];
	} else {
		ps = [0.4, 0.6];
	}
	if(Math.random() > .5) {
		ps = [ps, [0.25, 0.75]];
	} else {
		ps = [ps, [0.75, 0.25]];
	}
} else {
	if(Math.random() > .5) {
		ps = [0.25, .75];
	} else {
		ps = [0.75, 0.25];
	}
	if(Math.random() > .5) {
		ps = [ps, [0.4, 0.6]];
	} else {
		ps = [ps, [0.6, 0.4]];	
	}
}

var gaussian = [];
for (i = 0; i < 1000; i++) {
	gaussian[i] = createMemberInNormalDistribution(0,sd);
}

// participant ID
const get_ID = {
    type: jsPsychSurveyText,
    questions: [
        {
            prompt: "<div align=center><p class='inst_text'>あなたのID番号を回答してください（メールで提示したもの）<br>Please enter your participant ID (from the email)</p></div><br>",
            required: true,
            name: "participant_ID"
        }
    ],
    on_load: function() {
        let element = document.getElementById('input-0');
        element.type = 'number',
        element.min = 1, // set lower limit
        element.max = 200 // set upper limit
    },
    on_finish: function(data) {
        participantID = data.response.participant_ID;
    }
};


// timeline for one trial (main)
const one_trial = {
    type: jsPsychHtmlKeyboardResponse,
    timeline: [
       
    {// show the choice pattern
            stimulus: function() {

            let html = count_plz3;
                // randomize the position of first stage patterns
                var stims1 = shuffle([1,2]);
                stims = stims1;

                pattern_name1 = stage1patterns[stims[0]-1];
                pattern_name2 = stage1patterns[stims[1]-1];
                pattern_file1 = `<img src=${pattern_name1}>`;
                pattern_file2 = `<img src=${pattern_name2}>`;
              
                
               
                return html;
            },
            choices: "NO_KEYS",
            trial_duration: 1000
    },

    {// show the choice pattern
            stimulus: function() {

            let html = count_plz2;
                // randomize the position of first stage patterns
                //var stims1 = shuffle([1,2]);
               // stims = stims1;

                pattern_name1 = stage1patterns[stims[0]-1];
                pattern_name2 = stage1patterns[stims[1]-1];
                pattern_file1 = `<img src=${pattern_name1}>`;
                pattern_file2 = `<img src=${pattern_name2}>`;
              
                
               
                return html;
            },
   
            choices: "NO_KEYS",
            trial_duration: 1000
    },
    {// show the choice pattern
            stimulus: function() {

            let html = count_plz1;
                // randomize the position of first stage patterns
               // var stims1 = shuffle([1,2]);
              //  stims = stims1;

                pattern_name1 = stage1patterns[stims[0]-1];
                pattern_name2 = stage1patterns[stims[1]-1];
                pattern_file1 = `<img src=${pattern_name1}>`;
                pattern_file2 = `<img src=${pattern_name2}>`;
              
               
               
                return html;
            },
            choices: "NO_KEYS",
            trial_duration: 1000
    },
    
    
    {// show the pattern pair for stage1. Participants choose one of the two.
            stimulus: function(data) {
                let html = show_which; 
                // randomize the position of first stage patterns
              //  var stims1 = shuffle([1,2]);
               // var stims = stims1;

                pattern_name1 = stage1patterns[stims[0]-1];
                pattern_name2 = stage1patterns[stims[1]-1];
                pattern_file1 = `<img src=${pattern_name1}>`;
                pattern_file2 = `<img src=${pattern_name2}>`;

                html += `<p class='rocket_left_position'>${pattern_file1}</p>`;
                html += `<p class='rocket_right_position'>${pattern_file2}</p>`;

                    if (stims[0]-1 == 0) {
                        state1 = 1;
                        left_pattern = 0;
                        right_pattern = 1;
                }
                    else {
                        state1 = 2;
                        left_pattern = 1;
                        right_pattern = 0;
                    }
                console.log(state1);
                return html;
            },
            choices: ["f", "j"],
            trial_duration: 2000,
            on_finish: function() {
                chosen_key = jsPsych.data.get().last(1).values()[0].response;
            }
        },

        {// mid stage
            stimulus: function() {
                let html;

                if (chosen_key == "f") {
                    html = start_left;
                    chosen_pattern = left_pattern;
                    // left pattern is chosen
                    pattern_name = stage1patterns[left_pattern+2];
                    pattern_file = `<img src=${pattern_name}>`;
                    html += `<p class='rocket_left_position'>${pattern_file}</p>`;
                    // right pattern
                    let unchosen_one = stage1patterns[right_pattern];
                    let unchosen_one_file = `<img src=${unchosen_one}>`;
                    html += `<p class='rocket_right_position'>${unchosen_one_file}</p>`;
                    mid_dur = 1000;

                } else if (chosen_key == "j"){
                    html = start_right;
                    chosen_pattern = right_pattern;
                    // right pattern is chosen
                    pattern_name = stage1patterns[right_pattern+2];
                    pattern_file = `<img src=${pattern_name}>`;
                    html += `<p class='rocket_right_position'>${pattern_file}</p>`;
                    // right pattern
                    let unchosen_one = stage1patterns[left_pattern];
                    let unchosen_one_file = `<img src=${unchosen_one}>`;
                    html += `<p class='rocket_left_position'>${unchosen_one_file}</p>`;
                    mid_dur = 1000;

                } else {
                    html = no_response;
                    jsPsych.endCurrentTimeline()
                    mid_dur = 3000;

                }
                return html;
            },
            choices: "NO_KEYS",
            trial_duration: 2000
      }, 

        {// Stage2 pairs
            stimulus: function(data) {
                let html = show_which;
                random_num1 = Math.random();

                var stims2 = shuffle([1,2]);
                let stims = stims2;
                if (state1 == 1) {
                    if (chosen_key == "f"){
                        pattern_chosen_state1 = 1;
                        if (random_num1 < 0.7) {    
                            tran = 1;
                            stage2set = 0;            
                        }
                        else {
                            tran = -1;
                            stage2set = 1;
                        } 
                      }
                    else {
                        pattern_chosen_state1 = 2;

                        if (random_num1 < 0.7) {
                            tran = 1;
                            stage2set = 1;  
                        }
                        else {
                            tran = -1
                            stage2set = 0;
                        } 
                    }  
                pattern_name1 = stage2patterns[stage2set][stims[0]-1];
                pattern_name2 = stage2patterns[stage2set][stims[1]-1];
                pattern_file1 = `<img src=${pattern_name1}>`;
                pattern_file2 = `<img src=${pattern_name2}>`;
            }   
                if (state1 == 2) {
                    if (chosen_key == "f"){
                        pattern_chosen_state1 = 2;
                       if (random_num1 < 0.7){
                        tran = 1; 
                        stage2set = 1;               
                    }
                    else {
                        tran = -1;
                    stage2set = 0;
                } 
                
              }
                   else {
                      pattern_chosen_state1 = 1;
                       if (random_num1 < 0.7){
                        tran = 1;
                           stage2set = 0;               
                    }
                        else {
                            tran = -1;
                           stage2set = 1;
                    } 
              }
              pattern_name1 = stage2patterns[stage2set][stims[0]-1];
              pattern_name2 = stage2patterns[stage2set][stims[1]-1];
              pattern_file1 = `<img src=${pattern_name1}>`;
              pattern_file2 = `<img src=${pattern_name2}>`;
            }
            
            html += `<p class='rocket_left_position2'>${pattern_file1}</p>`;
            html += `<p class='rocket_right_position2'>${pattern_file2}</p>`;

            if (stage2set == 0) {

            if (stims[0]-1 == 0){      
                left_pattern = 0;
                right_pattern = 1;
                state2 = 3;
            }
            else if(stims[0]-1 == 1){
                left_pattern = 1;
                right_pattern = 0;
                state2 = 4;
            }} 
            else {
            if (stims[0]-1 == 0){      
                left_pattern = 0;
                right_pattern = 1;
                    state2 = 5;
                }
            else if(stims[0]-1 == 1){
                left_pattern = 1;
                right_pattern = 0;
                    state2 = 6;
            }}
                console.log(random_num1);
                return html;
            },
            choices: ["f", "j"],
            on_finish: function() {
                chosen_key = jsPsych.data.get().last(1).values()[0].response;
            },
            trial_duration: 2000
        },

        {// mid Stage2
            stimulus: function() {
                let html;
                if (chosen_key == "f") {
                    html = start_left;
                    chosen_pattern = left_pattern;
                    // left pattern is chosen
                    pattern_name = stage2patterns[stage2set][left_pattern+2];
                    pattern_file = `<img src=${pattern_name}>`;
                    html += `<p class='rocket_left_position2'>${pattern_file}</p>`;
                    // right pattern
                    let unchosen_one = stage2patterns[stage2set][right_pattern];
                    let unchosen_one_file = `<img src=${unchosen_one}>`;
                    html += `<p class='rocket_right_position2'>${unchosen_one_file}</p>`;
                } else if(chosen_key == "j") {
                    html = start_right;
                    chosen_pattern = right_pattern;
                    // right pattern is chosen
                    pattern_name = stage2patterns[stage2set][right_pattern+2];
                    pattern_file = `<img src=${pattern_name}>`;
                    html += `<p class='rocket_right_position2'>${pattern_file}</p>`;
                    // right pattern
                    let unchosen_one = stage2patterns[stage2set][left_pattern];
                    let unchosen_one_file = `<img src=${unchosen_one}>`;
                    html += `<p class='rocket_left_position2'>${unchosen_one_file}</p>`;
                }else{
                    html = no_response;
                    mid_dur = 3000;
                    jsPsych.endCurrentTimeline()
                };
                return html;
            },
            choices: "NO_KEYS",
            trial_duration: 2000
    },

        {// decide outcome
            stimulus: function(data) {
                let html;
                    //drifting probabilities
                    for (j = 0; j < 2; j++) {
                        for (k = 0; k < 2; k++) {
                            ps[j][k] = ps[j][k]+gaussian[Math.floor(Math.random()*gaussian.length)];
                            ps[j][k] = Math.min(ps[j][k],Math.max(1.5 - ps[j][k], .25));
                            ps[j][k] = Math.max(ps[j][k], Math.min(0.5 - ps[j][k], .75));
                        }
                    }
                random_num2 = Math.random();

               if (state2 == 3){
                 if (chosen_key == "f"){
                    pattern_chosen_state2 = 3;
                  if ( random_num2 < ps[0][0]) {
                    result = "reward";
                    r = 1;
                } else {
                    result = "punishment";
                    r = -1;
                };}
                 else {
                    pattern_chosen_state2 = 4;
                   if ( random_num2 < ps[0][1]) {
                    result = "reward";
                    r = 1;
                } else {
                    result = "punishment";
                    r = -1;
                }
                 }
               }
                
                else if (state2 == 4){
                    if (chosen_key == "f"){
                        pattern_chosen_state2 = 4;
                     if ( random_num2 < ps[0][1]) {
                       result = "reward";
                       r = 1;
                   } else {
                       result = "punishment";
                       r = -1;
                   };}
                    else {
                        pattern_chosen_state2 = 3;
                      if ( random_num2 < ps[0][0]) {
                       result = "reward";
                       r = 1;
                   } else {
                       result = "punishment";
                       r = -1;
                   }
                    }
                  }

                    else if (state2 == 5){
                        if (chosen_key == "f"){
                            pattern_chosen_state2 = 5;
                            if ( random_num2 < ps[1][0]) {
                              result = "reward";
                              r = 1;
                          } else {
                              result = "punishment";
                              r = -1;
                          };}
                           else {
                            pattern_chosen_state2 = 6;
                             if ( random_num2 < ps[1][1]) {
                              result = "reward";
                              r = 1;
                          } else {
                              result = "punishment";
                              r = -1;
                          }
                           }
                         }

                        else {
                            if (chosen_key == "f"){
                                pattern_chosen_state2 = 6;
                                if ( random_num2 < ps[1][1]) {
                                  result = "reward";
                                  r = 1;
                              } else {
                                  result = "punishment";
                                  r = -1;
                              };}
                               else {
                                pattern_chosen_state2 = 5;
                                 if ( random_num2 < ps[1][0]) {
                                  result = "reward";
                                  r = 1;
                              } else {
                                  result = "punishment";
                                  r = -1;
                              }
                               }
                             }

                // show outcomes
                    if (result == "reward") {
                        html += show_reward;
                        score = score+1;
                    } else {   
                        html += show_punish;
                    };

                console.log(random_num2);
                console.log(score);
                    return html;
            },
            trial_duration: 1500
        }/*,
        {// next trial
            stimulus: function() {
                let html;
                // show outcome
                if (chosen_pattern == 0) {
                    html += next_trial;
                    if (result == "reward") {
                        html += show_reward;
                    } else {
                        html += show_punish;
                    };
                } else {
                    html += next_trial;
                    if (result == "reward") {
                        html += show_reward;
                    } else {
                        html += show_punish;
                    };
                };
                html += next_trial;
                console.log(ps);
                return html;
            },
            choices: [" "],
        }*/
    ]
};

// timeline for one trial (practice)
let stims;
const one_trial_prac = {
    type: jsPsychHtmlKeyboardResponse,
    timeline: [
    
    {// show the choice pattern
            stimulus: function() {

            let html = count_plz3;
                // randomize the position of first stage patterns
                var stims1 = shuffle([1,2]);
                stims = stims1;

                pattern_name1 = prac_stage1patterns[stims[0]-1];
                pattern_name2 = prac_stage1patterns[stims[1]-1];
                pattern_file1 = `<img src=${pattern_name1}>`;
                pattern_file2 = `<img src=${pattern_name2}>`;
              
              
               
                return html;
            },
            choices: "NO_KEYS",
            trial_duration: 1000
    },

    {// show the choice pattern
            stimulus: function() {

            let html = count_plz2;
                // randomize the position of first stage patterns
                //var stims1 = shuffle([1,2]);
               // stims = stims1;

                pattern_name1 = prac_stage1patterns[stims[0]-1];
                pattern_name2 = prac_stage1patterns[stims[1]-1];
                pattern_file1 = `<img src=${pattern_name1}>`;
                pattern_file2 = `<img src=${pattern_name2}>`;
              
              
                return html;
            },
   
            choices: "NO_KEYS",
            trial_duration: 1000
    },
    {// show the choice pattern
            stimulus: function() {

            let html = count_plz1;
                // randomize the position of first stage patterns
               // var stims1 = shuffle([1,2]);
              //  stims = stims1;

                pattern_name1 = prac_stage1patterns[stims[0]-1];
                pattern_name2 = prac_stage1patterns[stims[1]-1];
                pattern_file1 = `<img src=${pattern_name1}>`;
                pattern_file2 = `<img src=${pattern_name2}>`;
              
               
                return html;
            },
            choices: "NO_KEYS",
            trial_duration: 1000
    },



    {// show stage1 patterns
            stimulus: function() {
                let html = show_which; 
                //// randomize the position of first stage patterns
                //var stims1 = shuffle([1,2]);
                //var stims = stims1;

                pattern_name1 = prac_stage1patterns[stims[0]-1];
                pattern_name2 = prac_stage1patterns[stims[1]-1];
                pattern_file1 = `<img src=${pattern_name1}>`;
                pattern_file2 = `<img src=${pattern_name2}>`;

                html +=  `<p class='rocket_left_position'>${pattern_file1}</p>`; 
                html += `<p class='rocket_right_position'>${pattern_file2}</p>`;

                

                    if (stims[0]-1 == 0) {
                        state1 = 1;
                        left_pattern = 0;
                        right_pattern = 1;
                    }
                    else {
                        state1 = 2;
                        left_pattern = 1;
                        right_pattern = 0;
                    }
                console.log(state1);
                return html;
            },
            choices: ["f", "j"],
            trial_duration: 2000,
            on_finish: function() {
                chosen_key = jsPsych.data.get().last(1).values()[0].response;
            }
    },
        
      {// mid stage
            stimulus: function() {
                let html;

                if (chosen_key == "f") {
                    html = start_left;
                    chosen_pattern = left_pattern;
                    // left pattern is chosen
                    pattern_name = prac_stage1patterns[left_pattern+2];
                    pattern_file = `<img src=${pattern_name}>`;
                    html += `<p class='rocket_left_position'>${pattern_file}</p>`;
                    // right pattern
                    let unchosen_one = prac_stage1patterns[right_pattern];
                    let unchosen_one_file = `<img src=${unchosen_one}>`;
                    html += `<p class='rocket_right_position'>${unchosen_one_file}</p>`;
                    mid_dur = 1000;

                } else if (chosen_key == "j"){
                    html = start_right;
                    chosen_pattern = right_pattern;
                    // right pattern is chosen
                    pattern_name = prac_stage1patterns[right_pattern+2];
                    pattern_file = `<img src=${pattern_name}>`;
                    html += `<p class='rocket_right_position'>${pattern_file}</p>`;
                    // right pattern
                    let unchosen_one = prac_stage1patterns[left_pattern];
                    let unchosen_one_file = `<img src=${unchosen_one}>`;
                    html += `<p class='rocket_left_position'>${unchosen_one_file}</p>`;
                    mid_dur = 1000;
                } else {
                    html = no_response;
                    mid_dur = 3000;
                    jsPsych.endCurrentTimeline()
                    
                }
                return html;        
            },
            choices: "NO_KEYS",
            trial_duration: 2000
      }, 
    

    {// Stage2 pairs
            stimulus: function() {
                let html = show_which; 
                var stims2 = shuffle([1,2]);
                let stims = stims2;
                if (state1 == 1) {
                    if (chosen_key == "f"){
                        if (Math.random() < 0.7) {    
                            stage2set = 0;            
                    }
                    else {
                        stage2set = 1;
                    } 
                      }
                    else {
                        if (Math.random() < 0.7) {
                            stage2set = 1;  
                        }
                    else {
                        stage2set = 0;
                    } 
                    }  
                pattern_name1 = prac_stage2patterns[stage2set][stims[0]-1];
                pattern_name2 = prac_stage2patterns[stage2set][stims[1]-1];
                pattern_file1 = `<img src=${pattern_name1}>`;
                pattern_file2 = `<img src=${pattern_name2}>`;
            }   
                if (state1 == 2) {
                    if (chosen_key == "f"){
                       if (Math.random() < 0.7){ 
                        stage2set = 1;               
                    }
                    else {
                    stage2set = 0;
                } 
                
              }
                   else {
                       if (Math.random() < 0.7){ 
                           stage2set = 0;               
                    }
                        else {
                           stage2set = 1;
                    } 
              }
                pattern_name1 = prac_stage2patterns[stage2set][stims[0]-1];
                pattern_name2 = prac_stage2patterns[stage2set][stims[1]-1];
                pattern_file1 = `<img src=${pattern_name1}>`;
                pattern_file2 = `<img src=${pattern_name2}>`;
            }
            
            html += `<p class='rocket_left_position2'>${pattern_file1}</p>`;
            html += `<p class='rocket_right_position2'>${pattern_file2}</p>`;

            if (stage2set == 0) {

                if (stims[0]-1 == 0){      
                    left_pattern = 0;
                    right_pattern = 1;
                    state2 = 3;
                }
                else if(stims[0]-1 == 1){
                    left_pattern = 1;
                    right_pattern = 0;
                    state2 = 4;
                }} 
                else {
                if (stims[0]-1 == 0){      
                    left_pattern = 0;
                    right_pattern = 1;
                        state2 = 5;
                    }
                else if(stims[0]-1 == 1){
                    left_pattern = 1;
                    right_pattern = 0;
                        state2 = 6;
                }}
                return html;
            },
            choices: ["f", "j"],
            on_finish: function() {
                chosen_key = jsPsych.data.get().last(1).values()[0].response;
            },
            trial_duration: 2000
            
    },


    {// mid Stage2
            stimulus: function() {
                let html;
                if (chosen_key == "f") {
                    html = start_left;
                    chosen_pattern = left_pattern;
                    // left pattern is chosen
                    pattern_name = prac_stage2patterns[stage2set][left_pattern+2];
                    pattern_file = `<img src=${pattern_name}>`;
                    html += `<p class='rocket_left_position2'>${pattern_file}</p>`;
                    // right pattern
                    let unchosen_one = prac_stage2patterns[stage2set][right_pattern];
                    let unchosen_one_file = `<img src=${unchosen_one}>`;
                    html += `<p class='rocket_right_position2'>${unchosen_one_file}</p>`;
                } else if(chosen_key == "j") {
                    html = start_right;
                    chosen_pattern = right_pattern;
                    // right pattern is chosen
                    pattern_name = prac_stage2patterns[stage2set][right_pattern+2];
                    pattern_file = `<img src=${pattern_name}>`;
                    html += `<p class='rocket_right_position2'>${pattern_file}</p>`;
                    // right pattern
                    let unchosen_one = prac_stage2patterns[stage2set][left_pattern];
                    let unchosen_one_file = `<img src=${unchosen_one}>`;
                    html += `<p class='rocket_left_position2'>${unchosen_one_file}</p>`;
                }else{
                    html = no_response;
                    mid_dur = 3000;
                    jsPsych.endCurrentTimeline()
                };
                return html;},

            choices: "NO_KEYS",

            trial_duration: 2000
    },


    {
            // get reward or punishment
            stimulus: function() {
                let html;
                // decide outcome
                p_random_num = Math.random();
               if (state2 == 3){
                 if (chosen_key == "f"){
                    pattern_chosen_state2 = 3;
                  if (p_random_num < 0.4) {
                    result = "reward";
                } else {
                    result = "punishment";
                };}
                 else {
                    pattern_chosen_state2 = 4;
                   if (p_random_num < 0.6) {
                    result = "reward";
                } else {
                    result = "punishment";
                }
                 }
               }
                
                else if (state2 == 4){
                    if (chosen_key == "f"){
                        pattern_chosen_state2 = 4;
                     if (p_random_num < 0.6) {
                       result = "reward";
                   } else {
                       result = "punishment";
                   };}
                    else {
                        pattern_chosen_state2 = 3;
                      if (p_random_num < 0.4) {
                       result = "reward";
                   } else {
                       result = "punishment";
                   }
                    }
                  }

                    else if (state2 == 5){
                        if (chosen_key == "f"){
                            pattern_chosen_state2 = 5;
                            if (p_random_num < 0.2) {
                              result = "reward";
                          } else {
                              result = "punishment";
                          };}
                           else {
                            pattern_chosen_state2 = 6;
                             if (p_random_num < 0.8) {
                              result = "reward";
                          } else {
                              result = "punishment";
                          }
                           }
                         }

                        else {
                            if (chosen_key == "f"){
                                pattern_chosen_state2 = 6;
                                if (p_random_num < 0.8) {
                                  result = "reward";
                              } else {
                                  result = "punishment";
                              };}
                               else {
                                pattern_chosen_state2 = 5;
                                 if (p_random_num < 0.2) {
                                  result = "reward";
                              } else {
                                  result = "punishment";
                              }
                               }
                             }
                
                // show outcomes
                    if (result == "reward") {
                        html += show_reward;
                    } else {
                        html += show_punish;
                    };
                console.log(p_random_num);
                return html;
            },
            trial_duration: 1500
    }/*, 
    {// next trial
            stimulus: function() {
                let html;
                // show outcome
                if (chosen_pattern == 0) {
                    if (result == "reward") {
                        html += show_reward;
                    } else {
                        html += show_punish;
                    };
                    html += next_trial;
                } else {
                    if (result == "reward") {
                        html += show_reward;
                    } else {
                        html += show_punish;
                    };
                };
                html += next_trial;
                return html;
            },
            choices: [" "]
    }*/
    ],
    on_timeline_finish: function() 
    {
    }  
};


//instruction test
const start_instruction = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
        let html = inst;
        return html;
    },
    choices: [" "]
};

// timeline for showing the end of the block
const show_block_end = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
        let html = block_fin;
        return html;
    },
    choices: [" "]
};

var score_block = {
	type: jsPsychHtmlKeyboardResponse,
	stimulus: function(){
		bonus = score*5;		
			let html = "<div align=center><p class='inst_text'>That was all for the behaviroal task!<br>これで行動実験は終了です!<br><br>Your total score is <font color = '#ff8000'><strong>" + score + "</font></strong> pioints.<br>あなたの得点は <strong><font color = '#ff8000'>" + score + "</font></strong> です。<br><br>You won an additional <strong><font color = '#ff8000'>￥" + bonus+ " </strong></font>on top of your regular payment for this experiment.<br>この実験では、3000円の報酬に加えて、さらに <font color = '#ff8000'><strong>" + bonus+ "円</font></strong> を獲得しました。<br><br>Press SPACE key to continue<br>スペースキーを押して続けてください</p></div><br>";
            return html;
        },
		choices: [" "]
};

// timeline for showing the end of the whole experiment
const show_exp_end = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
        let html = exp_fin;
        return html;
    },
    choices: [" "]
};

const ITI_prac ={
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "+",
    choices: "NO_KEYS",
    trial_duration: 800,}

//timeline for practice trials 1
const practice_1 = {
    timeline: [one_trial_prac,ITI_prac],
    loop_function: function() {
        if (trial_n < 5) {// repeat trial_num trials
            return true;
        } else {
            // initialize the trial counter
            trial_n = 0;
            return false;
        };
    },
    on_timeline_finish: function() {
        trial_n += 1;
    }
};

// timeline for practice trials
const practice = {
    timeline: [one_trial_prac,ITI_prac],
    loop_function: function() {
        if (trial_n < prac_trial_num) {// repeat trial_num trials
            return true;
        } else {
            // initialize the trial counter
            trial_n = 0;
            return false;
        };
    },
    on_timeline_finish: function() {
        trial_n += 1;
    }
};

const ITI = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "+",
    choices: "NO_KEYS",
    trial_duration: 800,
    on_finish: function(data) {
        if (trial_n > 0) {
            if (prev_a_state1 == pattern_chosen_state1) {
                stay = 1;
            } else {
                stay = 0;
            };
        } else {// at the first trial
            stay = null;
        };
        // update
        data.prev_action = prev_a_state1;
        prev_a_state1 = pattern_chosen_state1;
        data.state1position = state1,
        data.pattern_chosen_state1 = pattern_chosen_state1,
        data.s1random_number = random_num1,
        data.state2position = state2,
        data.pattern_chosen_state2 = pattern_chosen_state2,
        data.s2random_number = random_num2,
        data.probability1 = ps[0][0],
        data.probability2 = ps[0][1],
        data.probability3 = ps[1][0],
        data.probability4 = ps[1][1],
        data.score = score,
        data.participantID = participantID,
        data.rt_cond = 1;
        data.reward = r;
        data.transition = tran;
        data.stay = stay;
    }
};

// timeline to save data using pipeline
const save_data = {
    type: jsPsychPipe,
    action: "save",
    experiment_id: "67slEgLQZPKf",
    filename: function() {
        filename = `${participantID}.csv`;
        return(filename);
    },
    data_string: () => jsPsych.data.get().csv()
};

// timeline for one block
const one_block = {
    timeline: [one_trial, ITI,save_data],
    loop_function: function() {
        if (trial_n < trial_num) {// repeat trial_num trials
            return true;
        } else {
            // initialize the trial counter
            trial_n = 0;
            return false;
        };
    },
    on_timeline_finish: function() {
        trial_n += 1;
    }
};


// timeline for multiple blocks
const main = {
    data: {
      init_ps1: ps[0][0],
      init_ps2: ps[0][1],
      init_ps3: ps[1][0],
      init_ps4: ps[1][1]
    },
    timeline: [
        one_block,
        show_block_end
    ],
    loop_function: function() {
        if (block_n < block_num) {
            return true;
        } else {
            block_n = 0;
            return false;
        };
    },
    on_timeline_finish: function() {
        block_n += 1;
    }
}



const timeline = [];
timeline.push(preload);
timeline.push(get_ID);
timeline.push(image_sliderTrial1)
/*timeline.push(image_sliderTrial2)
timeline.push(image_sliderTrial3)*/
/*timeline.push(instructions_1a_block);
timeline.push(practice_1);
timeline.push(instructions_1b_block);
timeline.push(practice);
timeline.push(instructions_2_block);*/
timeline.push(main);
timeline.push(score_block);
timeline.push(show_exp_end);

// start the experiment
jsPsych.run(timeline);