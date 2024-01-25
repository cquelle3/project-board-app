import axios from "axios";

const API_URL = 'http://localhost:3001/api';

const ApiService = {
    getBoards: function(filter = {}){
        let boards = axios.get(API_URL + '/boards', {params : filter}, {headers: { 'Content-Type': 'application/json' }});
        return boards;
    },
    getBoardById: function(id){
        let board = axios.get(API_URL + `/boards/${id}`, {headers: { 'Content-Type': 'application/json' }});
        return board;
    },
    addBoard: function(board){
        let addedBoard = axios.post(API_URL + '/boards', JSON.stringify(board), {headers: { 'Content-Type': 'application/json' }});
        return addedBoard;
    },
    patchBoard: function(board){
        let patchedBoard = axios.put(API_URL + '/boards', JSON.stringify(board), {headers: { 'Content-Type': 'application/json' }});
        return patchedBoard;
    },
    leaveBoard: function(userId, boardId){
        let boards = axios.put(API_URL + '/boards/leave', JSON.stringify({userId: userId, boardId: boardId}), {headers: { 'Content-Type': 'application/json' }});
        return boards;
    },
    getItems: function(filter = {}){
        let items = axios.get(API_URL + '/items', {params: filter}, {headers: { 'Content-Type': 'application/json' }});
        return items;
    },
    addItem: function(item){
        let addedItem = axios.post(API_URL + '/items', JSON.stringify(item), {headers: { 'Content-Type': 'application/json' }});
        return addedItem;
    },
    patchItem: function(item){
        let patchedItem = axios.put(API_URL + '/items', JSON.stringify(item), {headers: { 'Content-Type': 'application/json' }});
        return patchedItem;
    },
    deleteItem: function(id){
        let deletedItem = axios.delete(API_URL + `/items/${id}`, {headers: { 'Content-Type': 'application/json' }});
        return deletedItem;
    }
};

export default ApiService;