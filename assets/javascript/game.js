$(document).ready(function() {
    var yourAttackPower;
    var yourHealthPoint;
    var enemyHealthPoint;
    var isYourHeroChosen;
    var isDefenderChosen;
    var yourHero;
    var defender;
    var yourHeroHP;
    var yourHeroAP;
    var defenderHP;
    var defenderCounterAP;

    function initialize() {
        yourAttackpower="";
        yourHealthPoint="";
        enemyHealthPoint="";
        isYourHeroChosen=false;
        isDefenderChosen=false;
        $("#selectionContainer").html($(".heroContainer"));
        $("#yourHero").empty();
        $("#notice").empty();
    }
    initialize();
    // assign attribute to each hero
    var a=$("#obiwan").attr("data-hp",120)
    console.log($("#obiwan").attr("ap"));
    // select a hero  
    $(".heroContainer").on("click", function() {
        if (!isYourHeroChosen){ //if needs to be inside eventlistner
            yourHero=this;
            yourHeroHP=$(this).attr("hp"); //cant use this.hp because js is not in html
            $("#yourHero").append(this);
            $(this).removeClass("heroContainer");// to remove class in chosen hero so it can not be selected again
            $("#availableEnemies").append($(".heroContainer"));
            isYourHeroChosen=true;
        }
        // select an enemy
        else if (!isDefenderChosen) {
            defender=this;
            $("#defender").append(this);
            isDefenderChosen=true;
        }

        


    }) 
});
