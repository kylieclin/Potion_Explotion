class Row{
    constructor(options){
        this.marbleColors = options.colors;
        this.domElements={
            row:null
        };
        this.randomNumberInRow = options.numbersInRow;
        this.marblesInRow = [];
        this.collectedMarbles=[];
        this.hiddenMarblePosition=9;
        this.marbleCallBack = this.checkExplosion;
        //===================================================
        //CALLBACKS
        this.callbacks = {
            addMarbles:options.callbacks.addMarble,
            removeMarble:options.callbacks.removeMarble,
            getRows:options.callbacks.getRows
        };
        //==================================================
        //BIND
        this.createMarbles = this.createMarbles.bind(this);
        this.checkExplosion = this.checkExplosion.bind(this);
        this.removeMarbles = this.removeMarbles.bind(this);
        //==================================================
    }
    checkExplosion(marbleClicked){
        //==================================================
        //collecting and hiding first marble
        var firstClickedIndex = this.marblesInRow.indexOf(marbleClicked)
        var prevSpot =  firstClickedIndex - 1;
        var nextSpot = firstClickedIndex + 1 ;
        this.collectedMarbles = [marbleClicked];
        marbleClicked.domElements.container.hide('slow');
        this.showMarble();
        //==================================================
        //checking neighbors
        while(this.marblesInRow[prevSpot]!==undefined && this.marblesInRow[nextSpot] !== undefined &&
            this.marblesInRow[prevSpot].getColor()===this.marblesInRow[nextSpot].getColor()){
            var explodeColor = this.marblesInRow[prevSpot].getColor()
            while(prevSpot>=0 && this.marblesInRow[prevSpot].getColor() === explodeColor){
                this.marblesInRow[prevSpot].domElements.container.hide('slow');
                this.collectedMarbles.push(this.marblesInRow[prevSpot--]);
                this.showMarble();
            }
            while(nextSpot<this.marblesInRow.length && this.marblesInRow[nextSpot].getColor()===explodeColor){
                this.marblesInRow[nextSpot].domElements.container.hide('slow');
                this.collectedMarbles.push(this.marblesInRow[nextSpot++])
                this.showMarble();
            }
        }
        console.log('collected marbles',this.collectedMarbles);
        this.removeMarbles();
        this.callbacks.getRows(this);
        if (this.marblesInRow.length>9){
            this.hiddenMarblePosition = 9;
        }
    }

    createMarbles(marbleColor){//if something is passed in..create one new marble and append to row
        if (marbleColor){
            var newMarble = new Marble(marbleColor,this.checkExplosion);
            this.domElements.row.append(newMarble.render());
            this.marblesInRow.push(newMarble);
        } else {
            for (var marbleIndex = 0;marbleIndex<this.marbleColors.length; marbleIndex++){
                var newMarble = new Marble(this.marbleColors[marbleIndex],this.checkExplosion);
                var marbleImage = newMarble.render();
                this.domElements.row.append(marbleImage);
                this.marblesInRow.push(newMarble);
            }
        }
    this.hideMarbles();
    }
    hideMarbles(){
        for (var marbleIndex=9;marbleIndex<this.marblesInRow.length;marbleIndex++){
            this.marblesInRow[marbleIndex].domElements.container.hide();
        }
    }
    hideMarbleInTime(marble,time){
        setTimeout(this.hideMarble(marble),time);
    }
    hideMarble(marble){
        marble.domElements.container.hide('slow');
    }
    showMarble(){
        if(this.marblesInRow.length>9 && this.marblesInRow[this.hiddenMarblePosition]){
            this.marblesInRow[this.hiddenMarblePosition].domElements.container.show('slow');
            this.hiddenMarblePosition++
        } else {
            return;
        }
    }
    removeMarblesInTime(milliseconds){
        setTimeout(this.removeMarbles,milliseconds)
    }
    removeMarbles() {
        console.log('before removal this row has ',this.marblesInRow.length);
        for (var marbleIndex in this.collectedMarbles){
            var currentMarble = this.collectedMarbles[marbleIndex];
            var marbleIndexRemoval =this.marblesInRow.indexOf(currentMarble);
            currentMarble.domElements.container.remove();
            this.marblesInRow.splice(marbleIndexRemoval,1);
        }
        console.log('after removal this row has ',this.marblesInRow.length)
    }
    render(){
        this.domElements.row = $('<div>',{
            class:"board-row",
        })
        return this.domElements.row
    }
}
