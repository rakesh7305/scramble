import mongoose from 'mongoose';

const scrambleGameSchema = new mongoose.Schema(
    {
        gameNo: { type: Number, required: false },
        gameDate: { type: Date, required: false },
        category: { type: String, required: false },
        clue: { type: String, required: false },
        scrambledClue: { type: String, required: false },
    },
    {
        timestamps: false,
    },

);

const ScrambleGame = mongoose.models.ScrambleGame || mongoose.model('ScrambleGame', scrambleGameSchema);
export default ScrambleGame;
