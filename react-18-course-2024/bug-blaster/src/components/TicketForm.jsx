import { useState, useEffect } from 'react';

export default function TicketForm({ dispatch, editingTicket }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('1');

  useEffect(() => {
    if (editingTicket) {
      setTitle(editingTicket.title);
      setDescription(editingTicket.description);
      setPriority(editingTicket.priority);
    } else {
      clearForm();
    }
  }, [editingTicket]);

  const priorityLabel = {
    1: 'Low',
    2: 'Medium',
    3: 'High',
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setPriority('1');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ticketData = {
      id: editingTicket ? editingTicket.id : new Date().toISOString(),
      title,
      description,
      priority,
    };

    dispatch({
      type: editingTicket ? 'UPDATE_TICKET' : 'ADD_TICKET',
      payload: ticketData,
    });

    clearForm();
  };

  const handleCancel = () => {
    dispatch({ type: 'CLEAR_EDITING_TICKET' });
    clearForm();
  };

  return (
    <form id="ticket-form" className="ticket-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title-input">Title</label>
        <input
          id="title-input"
          type="text"
          value={title}
          className="form-input"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description-input">Description</label>
        <textarea
          id="description-input"
          type="text"
          value={description}
          className="form-input"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <fieldset className="priority-fieldset">
        <legend>Priority</legend>
        {Object.entries(priorityLabel).map(([value, label]) => (
          <label
            htmlFor={`priority-${label}-input`}
            key={value}
            className="priority-label"
          >
            <input
              id={`priority-${label}-input`}
              type="radio"
              value={value}
              checked={priority === value}
              className="priority-input"
              onChange={(e) => setPriority(e.target.value)}
            />
            {label}
          </label>
        ))}
      </fieldset>
      <button type="submit" className="button">
        Submit
      </button>
      {editingTicket && (
        <button className="button" onClick={handleCancel}>
          Cancel Edit
        </button>
      )}
    </form>
  );
}
