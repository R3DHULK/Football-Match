var ww = 0;
var wh = 0;
var left_ball = 130;
var degrees;
var playing = true;
var direction_1,direction_2,direction_3;
$(document).ready(function() {
    ww = $(window).width();
    wh = $(window).height();
    $("#tutorial").css({
        "width":ww+"px",
        "height":wh+"px"
    });
    $(".lessons").css({
        "width":(ww-22)+"px",
        "height":(wh-22)+"px"
    });
    $(".tutorial_content").css({
        "width":(ww-42)+"px",
        "height":(wh-83)+"px"
    });
    $("#main").css({
        "height":wh+"px"
    });
    $("#playagain").on("click",function() {
        start();
    });
    $("#deg").on("input",function() {
        degrees = $(this).val()*-1;
        rotate_ball(degrees);
    });
    $("#deg").on("change",function() {
        if (!tutorial) {
            var kicks = parseInt($("#kicks").html())+1;
            $("#kicks").html(kicks);
            var ball_top = 330;
            var ball_left = 130;
            var value = $(this).val();
            var degrees = 90-(value*-1);
            var tangent = Math.tan(degrees*Math.PI/180);
            $("#ball_direction,#deg").hide();
            $("#ball").stop().animate({
                "top":"0px"
            },{
                duration:600,
                easing:"linear",
                step:function() {
if (tutorial_angles) {
                    distance = ball_top - parseInt($(this).css("top"));
                    x = distance/tangent;
                    new_left = ball_left+x;
                    $("#ball").css("left",new_left+"px");
                    if ( new_left<=0 || new_left>265) {
                        ball_left = new_left;
                        ball_top = parseInt($(this).css("top"));
                        value *= -1;
                        degrees = degrees = 90-(value*-1);
                        tangent = Math.tan(degrees*Math.PI/180);
                    }
                    ball_offset = $(this).offset();
                    $(".players").each(function() {
                        player_offset = $(this).offset();
                        if (collided(ball_offset,player_offset)) {
                            playing=false;
                            $("#ball").stop();
                            fail();
                            return false;
                        }
                    });
}
                },
                complete:function() {
if (tutorial_goal) {
                    var final_left = parseInt($("#ball").css("left"));
                    if (final_left>=93 && final_left<=167) {
                        goal();
                    } else {
                        fail();
                    }
}
                }
            });
        }
    });
});
function collided(b_offset,p_offset) {
    b_top = b_offset.top;
    b_left = b_offset.left;
    p_top = p_offset.top+66;
    p_left = p_offset.left;
    if ((b_left+33)>=p_left && b_left<=(p_left+35) &&
        (((b_top)>=(p_top-20)) && ((b_top)<=(p_top)))) {
        return true;
    }
    return false;
}
function goal() {
    var goals = parseInt($("#goals").html())+1;
    $("#goals").html(goals);
    playing = false;
    $("#ball").stop().animate({
        "top":"-30px"
    },{
        duration:100,
        easing:"linear",
        complete: function() {
            $("#goal").fadeTo(10,1,function() {
                $("#goal").stop().animate({
                    "background-size":"100%"
                },{
                    duration:600,
                    easing:"linear",
                    complete: function() {
                        $("#playagain").show();
                    }
                });
            });
        }
    });
}
function fail() {
    playing = false;
    var ball_top = parseInt($("#ball").css("top"));
    $("#ball").stop().animate({
        "top":(ball_top+50)+"px"
    },{
        duration:400,
        easing:"linear",
        complete: function() {
            $("#playagain").show();
        }
    });
}
function rotate_ball(degrees) {
    $("#ball_direction").css({
        "-webkit-transform":"rotate("+degrees+"deg)",
        "-moz-transform":"rotate("+degrees+"deg)",
        "-ms-transform":"rotate("+degrees+"deg)",
        "-o-transform":"rotate("+degrees+"deg)",
        "transform":"rotate("+degrees+"deg)"
    });
}
function start() {
    $("#goal").fadeTo(100,0,function() {
        $("#goal").css("background-size","1%");
    });
    playing = true;
    $("#playagain").html("Kick Again").hide();
    $("#ball,#ball_direction,#deg").show();
    $("#deg").val(0);
    rotate_ball(0);
    $("#ball").css({
        "top":"330px",
        "left":"130px"
    });
    var team = Math.floor(Math.random()*500)%2;
    $(".players").each(function() {
        bgp = $(this).css("background-position").split(" ");
        bgp = bgp[0]+" "+(team*-66)+"px";
        $(this).css("background-position",bgp);
    });
    pos = Math.floor(Math.random()*100)+50;
    $("#players_line_2 .players:eq(0)").css({
        "left":(pos)+"px"
    });
    $("#players_line_2 .players:eq(1)").css({
        "left":(pos+140)+"px"
    });
    pos = Math.floor(Math.random()*100)+50;
    $("#players_line_3 .players:eq(0)").css({
        "left":(pos)+"px"
    });
    $("#players_line_3 .players:eq(1)").css({
        "left":(pos+140)+"px"
    });
    $(".players").show();
    direction_1 = Math.floor(Math.random()*500)%2;
    direction_2 = Math.floor(Math.random()*500)%2;
    direction_3 = Math.floor(Math.random()*500)%2;
    move_players_1();
    move_players_2();
    move_players_3();
}
function move_players_1() {
    if (playing) {
        left_1 = (parseInt($("#players_line_1 .players:eq(0)").css("left"))+(direction_1===0?-1:1));
        $("#players_line_1 .players:eq(0)").css("left",left_1+"px");
        if (left_1>210) {
            direction_1 = 0;
        }
        if (left_1<105) {
            direction_1 = 1;
        }
        setTimeout(move_players_1,15);
    }
}
function move_players_2() {
    if (playing) {
        left_2 = (parseInt($("#players_line_2 .players:eq(0)").css("left"))+(direction_2===0?-1:1));
        $("#players_line_2 .players:eq(0)").css("left",left_2+"px");
        $("#players_line_2 .players:eq(1)").css("left",(left_2+140)+"px");
        if (left_2>150) {
            direction_2 = 0;
        }
        if (left_2<=35) {
            direction_2 = 1;
        }
        setTimeout(move_players_2,20);
    }
}
function move_players_3() {
    if (playing) {
        left_3 = (parseInt($("#players_line_3 .players:eq(0)").css("left"))+(direction_3===0?-1:1));
        $("#players_line_3 .players:eq(0)").css("left",left_3+"px");
        $("#players_line_3 .players:eq(1)").css("left",(left_3+100)+"px");
        if (left_3>190) {
            direction_3 = 0;
        }
        if (left_3<=35) {
            direction_3 = 1;
        }
        setTimeout(move_players_3,10);
    }
}
function show_tutorial(what) {
    $(".toggleMobile").click();
    $(".menu_titles,.tutorial_content").hide();
    $(".menu_titles:eq("+what+"),.tutorial_content:eq("+what+")").show();
}
// JS/JQuery for tutorial
var tutorial = true;
var tutorial_angles = false;
var tutorial_goal = false;
$(document).ready(function() {
    $(".toggleMobile").click(function() {
        $(this).toggleClass("active");
        $("#mobileMenu").slideToggle(500);
    });
    $(".next").click(function() {
        var next_id = parseInt($(this).attr("id").substr(5));
        if (next_id==8) {
            $("#tutorial,.menu_titles,.tutorial_content,.back").hide();
            $("#ball,#ball_image,#ball_direction").show();
            $("#kicks").parent().parent().show();
            $("#kicks").parent().show();
            $("#goals").parent().show();
            $("#kicks,#goals").show();
            $("#walls").css("border","0px").show();
            $(".players_line").css("border","0px").show();
            tutorial = false;
            tutorial_angles = true;
            tutorial_goal = true;
            start();
        } else {
            $(".menu_titles,.tutorial_content").hide();
            $(".menu_titles:eq("+next_id+"),.tutorial_content:eq("+next_id+")").show();
        }
    });
    $(".back").click(function() {
        playing = false;
        $("#tutorial").show();
    });
    $(".letmesee").click(function() {
        $("#tutorial").hide();
        var id = $(this).attr("id");
        switch (id) {
            case "gamefield":
                playing = false;
                tutorial_angles = false;
                tutorial_goal = false;
                $("#main div,button,input").hide();
                $("#walls").css("border","1px solid red").show();
                $(".players_line").css("border","1px solid blue").show();
                $(".sticks").show();
                $("#ball,#ball_image,#ball_direction").hide();
                $(".slider").hide();
                break;
            case "players":
                playing = false;
                tutorial_angles = false;
                tutorial_goal = false;
                $("#main div,button,input").hide();
                $("#walls").css("border","0px").show();
                $("#players_line_1 .players:eq(0)").css({
                    "left":"162px",
                    "background-position":"35px 0"
                });
                $("#players_line_2 .players:eq(0)").css({
                    "left":"92px",
                    "background-position":"0 0"
                });
                $("#players_line_2 .players:eq(1)").css({
                    "left":"232px",
                    "background-position":"-35px 0"
                });
                $("#players_line_3 .players:eq(0)").css({
                    "left":"112px",
                    "background-position":"-70px 0"
                });
                $("#players_line_3 .players:eq(1)").css({
                    "left":"212px",
                    "background-position":"-105px 0"
                });
                $(".players_line").css("border","0px").show();
                $(".players").show();
                $(".sticks").show();
                $("#ball,#ball_image,#ball_direction").hide();
                $(".slider").hide();
                break;
            case "players_movement":
                playing = true;
                tutorial_angles = false;
                tutorial_goal = false;
                $("#main div,button,input").hide();
                $("#walls").css("border","0px").show();
                $("#players_line_1 .players:eq(0)").css({
                    "left":"162px",
                    "background-position":"35px 0"
                });
                $("#players_line_2 .players:eq(0)").css({
                    "left":"92px",
                    "background-position":"0 0"
                });
                $("#players_line_2 .players:eq(1)").css({
                    "left":"232px",
                    "background-position":"-35px 0"
                });
                $("#players_line_3 .players:eq(0)").css({
                    "left":"112px",
                    "background-position":"-70px 0"
                });
                $("#players_line_3 .players:eq(1)").css({
                    "left":"212px",
                    "background-position":"-105px 0"
                });
                $(".players_line").css("border","0px").show();
                $(".players").show();
                $(".sticks").show();
                $("#ball,#ball_image,#ball_direction").hide();
                direction_1 = Math.floor(Math.random()*500)%2;
                direction_2 = Math.floor(Math.random()*500)%2;
                direction_3 = Math.floor(Math.random()*500)%2;
                move_players_1();
                move_players_2();
                move_players_3();
                $(".slider").hide();
                break;
            case "see_ball":
                playing = false;
                $("#main div,button,input").hide();
                $("#walls").css("border","0px").show();
                $(".players_line").css("border","0px").show();
                $(".players").hide();
                $(".sticks").show();
                $("#ball,#ball_image,#ball_direction").show();
                $(".slider").hide();
                break;
            case "balldirection":
                playing = false;
                tutorial = true;
                tutorial_angles = false;
                tutorial_goal = false;
                $("#main div,button,input").hide();
                $("#walls").css("border","0px").show();
                $(".players_line").css("border","0px").show();
                $(".players").hide();
                $(".sticks").show();
                $("#ball,#ball_image,#ball_direction").show();
                $(".slider").show();
                break;
            case "ballmovement":
                playing = false;
                tutorial = false;
                tutorial_angles = false;
                tutorial_goal = false;
                $("#main div,button,input").hide();
                $("#walls").css("border","0px").show();
                $(".players_line").css("border","0px").show();
                $(".players").hide();
                $(".sticks").show();
                $("#ball,#ball_image,#ball_direction").show();
                $(".slider").show();
                $("#ball,#ball_direction,#deg").show();
                $("#deg").val(0);
                rotate_ball(0);
                $("#ball").css({
                    "top":"330px",
                    "left":"130px"
                });
                break;
            case "ballmovement_angle":
                playing = false;
                tutorial = false;
                tutorial_angles = true;
                tutorial_goal = false;
                $("#main div,button,input").hide();
                $("#walls").css("border","0px").show();
                $(".players_line").css("border","0px").show();
                $(".players").hide();
                $(".sticks").show();
                $("#ball,#ball_image,#ball_direction").show();
                $(".slider").show();
                $("#ball,#ball_direction,#deg").show();
                $("#deg").val(0);
                rotate_ball(0);
                $("#ball").css({
                    "top":"330px",
                    "left":"130px"
                });
                break;
        }
    });
});