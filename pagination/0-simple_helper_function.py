def index_range(page: int, page_size: int) -> tuple[int, int]:
    """
    Calculate the start and end indexes for a particular pagination parameter.
    
    Args:
        page (int): The 1-indexed page number.
        page_size (int): The number of items per page.
        
    Returns:
        tuple[int, int]: A tuple containing the start index and end index.
    """
    start_index = (page - 1) * page_size
    end_index = page * page_size
    return start_index, end_index