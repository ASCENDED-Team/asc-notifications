import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';

const Rebar = useRebar();

const HOSPITALS = [
    { x: -248.01309204101562, y: 6332.01513671875, z: 33.0750732421875 },
    { x: 1839.15771484375, y: 3672.702392578125, z: 34.51904296875 },
    { x: 297.4647521972656, y: -584.7089233398438, z: 44.292724609375 },
    { x: -677.0172119140625, y: 311.7821350097656, z: 83.601806640625 },
    { x: 1151.2904052734375, y: -1529.903564453125, z: 36.3017578125 },
];

const Internal = {
    /**
     * Returns the closest hospital position.
     *
     * @param {alt.IVector3} pos A position in the world.
     * @return {alt.IVector3}
     */
    getClosestHospital(pos: alt.IVector3): alt.IVector3 {
        const sortedByDistance = HOSPITALS.sort((a, b) => {
            const distA = distance2d(pos, a);
            const distB = distance2d(pos, b);
            return distA - distB;
        });

        return sortedByDistance[0];
    },
    /**
     * Respawns the player, and resets their death data.
     *
     * @param {alt.Player} victim
     * @return {void}
     */
    respawn(victim: alt.Player) {

        if (!victim || !victim.valid) {
            return;
        }

        
        const victimData = Rebar.document.character.useCharacter(victim);
        const document = victimData.get();
        if (typeof victimData === 'undefined') {
            return;
        }

        if (!document.isDead) {
            return;
        }

        const newPosition = Internal.getClosestHospital(victim.pos);
        victimData.set('isDead', false);
        victim.spawn(newPosition.x, newPosition.y, newPosition.z, 0);
        victim.clearBloodDamage();
    },

    /**
     * Respawns the player after 5 seconds in their same position.
     *
     * @param {alt.Player} victim
     * @return {void}
     */
    handleDefaultDeath(victim: alt.Player) {

        if (!victim || !victim.valid) {
            return;
        }

        const victimData = Rebar.document.character.useCharacter(victim);
        const document = victimData.get();
        if (!victimData) {
            return;
        }

        victimData.set('isDead', true);

        alt.setTimeout(() => {
            if (!victim || !victim.valid) {
                return;
            }

            Internal.respawn(victim);
        }, 5000);
    },

    distance2d(vector1: alt.IVector2, vector2: alt.IVector2): number {
        if (vector1 === undefined || vector2 === undefined) {
            throw new Error('AddVector => vector1 or vector2 is undefined');
        }
    
        return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2));
    },
    
    init() {
        alt.on('playerDeath', Internal.handleDefaultDeath);
    },
};

Internal.init();