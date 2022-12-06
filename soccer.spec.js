describe('tests for the soccer game', () => {
    describe('test the gettotalpoints method', () => {
        it('should return correct point total 7', () => {
            const points = getTotalPoints('wwdl')
            expect(points).toBe(7)
            // expect(getTotalPoints('dddl')).toBe(3)
        })
    })
    describe('test the order Teams function', () => {
        it ('should return the correct teams, with points', () => {
            const team1 = {
                name: "sounder",
                results: "wwwwwldl"
            }
            const team2 = { 
                name: "galaxy",
                results: "ldwdwlwl"
            }
            const expectedString = 'Sounders: 16 Galaxy: 11'
            const result = orderTeams(team1, team2)
            expect(result).toEqualt(expectedString);


        })
    })
})


