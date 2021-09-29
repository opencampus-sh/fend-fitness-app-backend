import { list } from '@keystone-next/keystone';
import {
  text,
  relationship,
  integer,
  timestamp,
  select,
} from '@keystone-next/keystone/fields';
import { document } from '@keystone-next/fields-document';

export const Program = list({
    fields: {
      title: text(),
      description: text({
        isRequired: true,
        ui: { displayMode: 'textarea' },
      }),
      slug: text({
        isFilterable: true,
        hooks: {
          validateInput: ({ resolvedData, addValidationError }) => {
            const { slug } = resolvedData;
            const regEx = /^[a-z,0-9](\w|-)+[a-z,0-9]$/gm;
            if (!regEx.test(slug)) {
              // We call addValidationError to indicate an invalid value.
              addValidationError('The slug may only consist of letters and number separated by -');
            }
          }
        },
      }),
      focus: select({
        isFilterable: true,
        options: [
          { label: 'Weightloss', value: 'weightloss' },
          { label: 'Strength', value: 'strength' },
          { label: 'Cardio', value: 'cardio' },
        ],
      }),
      difficulty: select({
        isFilterable: true,
        options: [
          { label: 'Beginner', value: 'beginner' },
          { label: 'Intermediate', value: 'intermediate' },
          { label: 'Experienced', value: 'experienced' },
        ],
      }),
      duration: integer({
        isRequired: true,
      }),
      publishDate: timestamp(),
      workouts: relationship({
        ref: 'Workout.programs',
        ui: {
          displayMode: 'cards',
          cardFields: ['title'],
          inlineEdit: { fields: ['name'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['name'] },
        },
        many: true,
      }),
    },
  });

  export default Program;
