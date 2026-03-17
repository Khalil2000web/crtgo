// app/u/[username]/page.js
import { supabase } from '@/lib/supabase';
import TemplateOne from '@/components/templates/TemplateOne';
import TemplateTwo from '@/components/templates/TemplateTwo';
import TemplateThree from '@/components/templates/TemplateThree';

export default async function UserPage({ params }) {
  const { username } = params;

  const { data: profile } = await supabase
    .from('profiles')
    .select('template, data')
    .eq('username', username)
    .single();

  if (!profile) return <p>User not found</p>;

  let Template;
  if (profile.template === 'TemplateOne') Template = TemplateOne;
  else if (profile.template === 'TemplateTwo') Template = TemplateTwo;
  else Template = TemplateThree;

  return <Template data={profile.data} />;
}
