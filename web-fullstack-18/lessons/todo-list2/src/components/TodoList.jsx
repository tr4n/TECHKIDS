import React from 'react';

// class TodoList extends React.Component {
//     state = {
//         todos: [{
//                 content: "Go shoping",
//                 finish: false
//             },
//             {
//                 content: "Clean house",
//                 finish: false
//             }
//         ]
//     };
//     render() {
//         return (
//             <div className="TodoList">
//                 <p>{this.state.todos[0].content}</p>
//             </div>
//         );
//     }
// }



const TodoList = (props) => {
    return (
        <div>
            <h3>Todo List</h3>
            <div>
                {
                    props.todoItems.map(item => {
                        return item.finish ? (
                            <p key={item.id}>
                                <del>{item.content}</del>
                                <button onClick={() => { props.deleteItem(item.id) }}> DELETE </button>
                            </p>
                        ) : (
                                <p key={item.id}>{item.content}
                                    <button onClick={() => { props.updateItem(item.id) }}>DONE</button>
                                    <button onClick={() => { props.deleteItem(item.id) }}> DELETE </button>
                                </p>
                            );
                    })
                }
            </div>
        </div>
    );

}
export {
    TodoList
}