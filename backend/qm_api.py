from collections import defaultdict


def to_binary(n, bits):
    return format(n, f'0{bits}b')

def ones_count(s):
    return s.count('1')

def differ_by_one(a, b):
    diff, pos = 0, -1
    for i in range(len(a)):
        if a[i] != b[i]:
            diff += 1
            pos = i
    return diff == 1, pos

def merge(a, b, pos):
    return a[:pos] + '-' + a[pos+1:]

def term_to_expr(term):
    expr = ""
    for i, ch in enumerate(term):
        var = chr(ord('A') + i)
        if ch == '1':
            expr += var
        elif ch == '0':
            expr += var + "'"
    return expr if expr else "1"


def quine_mccluskey_with_steps(minterms, dontcares):
    bits = max(minterms + dontcares).bit_length()
    all_terms = sorted(set(minterms + dontcares))

    steps = []

    # INITIAL GROUP
    groups = defaultdict(list)
    for m in all_terms:
        groups[ones_count(to_binary(m, bits))].append(to_binary(m, bits))

    steps.append({
        "stage": "initial_grouping",
        "groups": dict(groups)
    })

    prime_implicants = set()
    round_no = 1

    # MERGING ROUNDS
    while True:
        new_groups = defaultdict(list)
        used = set()
        merges = []

        keys = sorted(groups)

        for i in range(len(keys) - 1):
            for a in groups[keys[i]]:
                for b in groups[keys[i+1]]:
                    ok, pos = differ_by_one(a, b)
                    if ok:
                        merged = merge(a, b, pos)
                        merges.append({
                            "from": [a, b],
                            "result": merged
                        })
                        new_groups[ones_count(merged.replace('-', ''))].append(merged)
                        used.add(a)
                        used.add(b)

        for g in groups:
            for term in groups[g]:
                if term not in used:
                    prime_implicants.add(term)

        if not new_groups:
            break

        steps.append({
            "stage": "merge_round",
            "round": round_no,
            "merges": merges,
            "groups": dict(new_groups)
        })

        round_no += 1
        groups = new_groups

    # PRIME IMPLICANT 
    chart = defaultdict(list)
    for m in minterms:
        b = to_binary(m, bits)
        for p in prime_implicants:
            if all(p[i] == '-' or p[i] == b[i] for i in range(bits)):
                chart[m].append(p)

    essential = {chart[m][0] for m in chart if len(chart[m]) == 1}

    return {
        "steps": steps,
        "primeImplicants": sorted(prime_implicants),
        "essentialPrimeImplicants": sorted(essential),
        "expression": " + ".join(term_to_expr(e) for e in essential)
    }
