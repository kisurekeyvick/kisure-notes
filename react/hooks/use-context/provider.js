function Consumer(props) {
    const context = useContext(Context);
    return (
      <div>
        {context}
      </div>
    );
}