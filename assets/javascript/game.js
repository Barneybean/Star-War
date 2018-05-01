$(document).ready(function() {
    var isYourHeroChosen;
    var isDefenderChosen;
    var yourHero;
    var defender;
    var yourHeroHp;
    var yourHeroAp;
    var defenderHp;
    var defenderCounterAp;
    var heroName;
    var defenderName;

    function initialize() {
        yourHeroAp="";
        yourHeroHp="";
        defenderCounterAp="";
        isYourHeroChosen=false;
        isDefenderChosen=false;
        $("#yourHero").empty();
        $("#notice").empty();
    }
    
    // select a hero  
    $(document).on("click", ".heroContainer", function() { //!!!!~~if initialed () at the bottom then the on click function don’t know what .heroContainer class is, so write it this way to target html document first.
        if (!isYourHeroChosen){ //if needs to be inside eventlistner
            yourHero=this;
            yourHeroHp=parseInt($(this).attr("hp")); //cant use this.hp because js is not in html !!!!!!!!
            yourHeroAp=parseInt($(this).attr("ap"));// for combat calculation
            $("#yourHero").append(yourHero); //to move selected hero to Your Hero block
            $(this).find("span.hp").addClass("theHeroHp"); //changeable ap for selected heroHp **************!!!!!!
            $(this).find("span.ap").addClass("theHeroAp");
            $(this).removeClass("heroContainer");// to remove class in chosen hero so it can not be selected again
            $("#availableEnemies").append($(".heroContainer")); //move the rest of heros to available area
            $(this).addClass("heroContainer"); //add back class for reset
            isYourHeroChosen=true; //change flag to true so heros wont be added to your hero again
        }
        // select an enemy
        else if (!isDefenderChosen) {
            defender=this;
            defenderName=$(this).attr("name");
            defenderHp=parseInt($(this).attr("hp")); //for combat calculation
            defenderCounterAp=parseInt($(this).attr("counterap")); //counter ap selected defender for combat
            $(this).find("span.hp").addClass("theDefenderHp");
            $("#defender").append(defender);
            isDefenderChosen=true;
        }
        
        if (isDefenderChosen) {
            $("#notice").empty();
            $("#fightBtn").on("click", function() {
                defenderHp -= yourHeroAp;
                yourHeroHp -= defenderCounterAp;
                if (isDefenderChosen) {//unchange if no defender is selected
                    yourHeroAp +=yourHeroAp; //yourHero's Ap will increase last ap after every attack
                };
                
                $(".theHeroHp").html(yourHeroHp); //to display changed hp after attack
                $(".theHeroAp").html(yourHeroAp); //same for ap
                $(".theDefenderHp").html(defenderHp);
                $("#notice").html("You attacked "+defenderName+" for "+ yourHeroAp + " damage."+"<br><br>"+defenderName+" attacked you back for "+defenderCounterAp+" damage."+"<br><br><br><br>")
                
                
                if (yourHeroHp > 0 && defenderHp <= 0) {
                    $("#notice").text("You have defeted "+defenderName+" choose another enemy to play.")
                    $("#defender").empty();
                    defenderCounterAp=0;
                    defenderHp=$(this).attr("hp");
                    isDefenderChosen=false;
                }
                else if (yourHeroHp <= 0 && defenderHp > 0)  {
                    $("#notice").html("You Lost! Click on reset Button to play again")
                    $("#yourHero").empty();
                    // $("#reset").animate({display:"block"});
                }
                else if (yourHeroHp <= 0 && defenderHp <=0) {
                    $("#notice").html("You Lost! Click on reset Button to play again")
                    $("#yourContainer").empty();
                    $("#defenderContainer").empty();
                    $(this).attr("hp");
                }

                else if (yourHeroHp > 0 && $("#availableEnemies").html() =="") {
                    $("#defenderContainer").html("<img src='assets/images/youwin.jpg' style='height:30%; width:30%'/>");
                }
            })
        }
        else {
            $("#notice").text("No enemy is Chosen");
        }
    });

    $("#reset").on("click", function() {
        window.location.reload(); // reload page to reset
    });

    initialize();
    // add music
    //try using object
});
