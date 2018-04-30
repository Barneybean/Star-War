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
        defenderHp="";
        defenderCounterAp="";
        isYourHeroChosen=false;
        isDefenderChosen=false;
        $("#selectionContainer").html($(".heroContainer"));
        $("#yourHero").empty();
        $("#notice").empty();
    }
    initialize();
    // select a hero  
    $(".heroContainer").on("click", function() {
        if (!isYourHeroChosen){ //if needs to be inside eventlistner
            yourHero=this;
            yourHeroHp=parseInt($(this).attr("hp")); //cant use this.hp because js is not in html
            yourHeroAp=parseInt($(this).attr("ap"));// for combat calculation
            $("#yourHero").append(yourHero); //to move selected hero to Your Hero block
            $(this).find("span.hp").addClass("theHeroHp"); //changeable ap for selected heroHp 
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
                yourHeroAp +=yourHeroAp; //yourHero's Ap will increase last ap after every attack
                yourHeroHp -= defenderCounterAp;
                $(".theHeroHp").html(yourHeroHp); //to display changed hp after attack
                $(".theHeroAp").html(yourHeroAp); //same for ap
                $(".theDefenderHp").html(defenderHp);
                $("#notice").html("You attacked "+defenderName+" for "+ yourHeroAp + " damage."+"<br><br>"+defenderName+" attacked you back for "+defenderCounterAp+" damage."+"<br><br><br><br>")
                console.log(yourHeroHp > 0 && defenderHp <= 0);
                if (yourHeroHp > 0 && defenderHp <= 0) {
                    $("#notice").text("You have defeted "+defenderName+" choose another enemy to play.")
                    $(".defender").remove(defender);
                    isDefenderChosen=false;
                }
                else if (yourHeroHp <= 0 && defenderHp > 0) {
                    $("#notice").html("You Lost! Click on reset Button to play again")
                    // $("#reset").animate({display:"block"});
                }
            })
        }
        else {
            $("#notice").text("No enemy is Chosen");
        }
        
        
    });

    $("#reset").on("click", function() {
        initialize();
    });
    
    console.log();
    // remove defender when defeated;
    // add music
    // add all defeated
});
