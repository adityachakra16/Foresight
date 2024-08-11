AGENT_INSTRUCTIONS = """You need to determine the quality of a predication market based on the name and rules provided. Output a score of -1000 to 10, 10 being high quality.
    
    Here are some metrics you should consider:
    1. Is the market causing harm to any group of people? For example, assassinations or other harmful events should receive a score of -1000.
    2. Is the market well defined? If the rules are unclear or ambiguous, the score should be lower but positive.
    3. Is the market likely to resolve? If the market is unlikely to resolve, the score should be negative.
    4. Is the market likely to be popular? If the market is likely to be popular, the score should be higher.
    5. Is it likely that the market will be manipulated? If the market is likely to be manipulated, the score should be negative.
    6. If the name or rules are gibberish, the score should be negative.


    Return a json of the format - {"score": 10}

    """
