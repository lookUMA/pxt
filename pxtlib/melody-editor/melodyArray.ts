namespace pxtmelody {
    export class MelodyArray {
        // check that array is 9x8 
        private tempo: number = 120;
        private width: number = 8;
        private height: number = 8;
        private melody: boolean[][]; 

        // constructor
        constructor(tempo?: number) {
            if (tempo) this.tempo = tempo;
            // set all elements to false
            this.melody = new Array(this.width);
            for (var i = 0; i < this.width; i++) {
                this.melody[i] = new Array(this.height).fill(false);
            }
        }
        
        // setValue

        // getValue
        public getArray(): boolean[][] {
            return this.melody;
        }

        public setArray(array: boolean[][]): void {
            this.melody = array;
        }

        public getColor(row: number): number {
            // TODO
            return 0;
        }

        public getValue(row: number, col: number): boolean {
            return this.melody[row][col];
        }

        public getWidth(): number {
            return this.width;
        }

        public getHeight(): number {
            return this.height;
        }

        public copy(): boolean[][] {
            let copy = new MelodyArray();
            copy.setArray(this.getArray());
            return copy.getArray();
        }

        public updateMelody(row: number, col: number) {
            this.melody[row][col] = !this.melody[row][col];
        }


        // function to turn into string
        public getStringRepresentation(): string {
            let stringMelody: string = "";
            let queues: string[][];
            queues = new Array(this.width);
            let numMelodies = 0;
            // create queues of notes
            for (var i = 0; i < this.height; i++) {
                let noteCount = 0;
                queues[i] = [];
                for (var j = 0; j < this.width; j++) {
                    if (this.melody[j][i]) {
                        queues[i].push(noteConversion(j));
                        noteCount++;
                    }
                }
                if (noteCount > numMelodies) {
                    numMelodies = noteCount;
                }
            }
            // create strings of melodies
            for (var j = 0; j < numMelodies; j++) {
                for (var i = 0; i < this.width; i++) {
                    if (queues[i] && queues[i].length > 0) { // if there is an element
                        stringMelody += queues[i].shift() + " ";
                    } else {
                        stringMelody += "R "; // add rest if there is no selection for the note
                    }
                }
                stringMelody += "-"; // this will be used to split each melody
            }
    
            return stringMelody;
        }
    }

    export function noteConversion(rowNum: number): string {
        let note: string = "";
        switch(rowNum) {
            case 0: note = "C"; break;
            case 1: note = "D"; break;
            case 2: note = "E"; break;
            case 3: note = "F"; break;
            case 4: note = "G"; break;
            case 5: note = "A"; break;
            case 6: note = "B"; break;
            case 7: note = "C5"; break;
        }
        return note;
    }

    export function getRowNum(note: string): number {
        let rowNum: number = 0;
        switch(note) {
            case "C": rowNum = 0; break;
            case "D": rowNum = 1; break;
            case "E": rowNum = 2; break;
            case "F": rowNum = 3; break;
            case "G": rowNum = 4; break;
            case "A": rowNum = 5; break;
            case "B": rowNum = 6; break;
            case "C5": rowNum = 7; break;
        }
        return rowNum;
    }
}