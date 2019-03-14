
class Marble{
    constructor( color, clickCallback ){
        this.marbleColor = color;
        this.callbacks = {
            click: clickCallback
        }
        this.handleClick = this.handleClick.bind( this );
        this.domElements = {
            container: null,
            marble:null,
            emptyContainer:null
        } 
        this.audio = new Audio('sound/bubbles.mp3')
    }
    handleClick(){
        debugger;
        if(potionClicked){
            this.audio.play();
            $('.marble').toggleClass('marbleanima');
            $('.playerText').text('Click potion to collect marbles');
            marbleClicked = true;
            potionClicked = false;
            this.callbacks.click(this); 
        }

    }
    getColor(){
        return this.marbleColor;
    }
    makeEmptyContainer(){
        this.domElements.emptyContainer = $("<div>",{
            'class': 'marble-container'
        });
    }
    render(){
        this.domElements.container = $("<div>",{
            'class': 'marble-container'
        });
        this.domElements.marble = $("<div>",{
            'class': 'marble marbleanima',
            css:{'background-color':this.marbleColor}
        });

        this.domElements.container.click( this.handleClick );

        this.domElements.container.append(this.domElements.marble );

        return this.domElements.container;
    }
}





















